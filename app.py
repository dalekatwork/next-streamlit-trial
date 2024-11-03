import streamlit as st
import os
import socket
from http.server import HTTPServer, SimpleHTTPRequestHandler
import threading
from urllib.parse import quote, urlparse
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Configure Streamlit page
st.set_page_config(
    page_title="SnowWise",
    page_icon="❄️",
    layout="wide",
    initial_sidebar_state="collapsed"
)

# Custom CSS for layout and styling
st.markdown("""
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap');

        /* Base styles */
        *, .stMarkdown, .stText, div, span, p {
            font-family: 'Quicksand', sans-serif !important;
            font-size: 13px !important;
        }

        /* Hide Streamlit branding */
        #MainMenu {visibility: hidden;}
        footer {visibility: hidden;}
        header {display: none !important;}

        /* Container styling */
        .stApp {
            background: linear-gradient(135deg, #1a1a1a 0%, #0a192f 100%);
        }

        /* Navigation menu container */
        .nav-container {
            height: 10vh;
            padding: 0.75rem 1.5rem;
            background: rgba(255, 255, 255, 0.03);
            backdrop-filter: blur(10px);
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            margin-bottom: 0 !important;
        }

        /* Tab styling */
        .stTabs [data-baseweb="tab-list"] {
            gap: 8px;
            background-color: rgba(255, 255, 255, 0.05);
            padding: 0.5rem;
            border-radius: 10px;
            height: 10vh;
            display: flex;
            align-items: center;
        }

        .stTabs [data-baseweb="tab"] {
            height: 40px;
            padding: 0 16px;
            background-color: transparent;
            border: none;
            color: #ffffff80;
            font-weight: 500;
            transition: all 0.2s ease;
        }

        .stTabs [data-baseweb="tab"]:hover {
            color: white;
            background-color: rgba(255, 255, 255, 0.1);
        }

        .stTabs [aria-selected="true"] {
            background-color: rgba(255, 255, 255, 0.1) !important;
            color: white !important;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }

        /* Hide default Streamlit padding */
        .block-container {
            padding-top: 0 !important;
            padding-bottom: 0 !important;
            max-width: 100% !important;
        }

        /* Debug sidebar styling */
        .css-1d391kg {
            font-size: 13px !important;
        }

        .css-1d391kg .stMarkdown {
            font-size: 13px !important;
            font-weight: 500;
            margin-bottom: 1rem;
        }


        /* Iframe styling */
        iframe {
            font-family: 'Quicksand', sans-serif !important;
            width: 100%;
            border: none;
            background: rgba(255, 255, 255, 0.02);
            border-radius: 0;
            transition: all 0.3s ease;
        }
    </style>
""", unsafe_allow_html=True)

class NextJSHandler(SimpleHTTPRequestHandler):
    def log_message(self, format, *args):
        logger.info(format % args)

    def translate_path(self, path):
        """Translate URL path to filesystem path."""
        # Parse the URL and remove query string
        parsed = urlparse(path)
        path = parsed.path

        logger.info(f"Incoming request path: {path}")
        logger.info(f"Current directory: {self.directory}")

        # Handle root path and extensions
        if path == '/':
            path = '/index.html'
        elif not path.endswith(('.html', '.js', '.css', '.png', '.svg', '.json', '.txt')):
            print("ewwjrlkwqjerl", f"{path}.html")
            path = f"{path}.html"

        # Create absolute filesystem path
        fs_path = os.path.join(self.directory, 'out',path.lstrip('/'))
        logger.info(f"Translated path: {fs_path}")
        logger.info(f"File exists: {os.path.exists(fs_path)}")

        return fs_path

    def do_GET(self):
        try:
            logger.info(f"GET request for: {self.path}")
            file_path = self.translate_path(self.path)

            if os.path.exists(file_path) and os.path.isfile(file_path):
                with open(file_path, 'rb') as f:
                    fs = os.fstat(f.fileno())
                    self.send_response(200)
                    self.send_header('Content-type', self.guess_type(file_path))
                    self.send_header('Content-Length', str(fs[6]))
                    self.send_header('Last-Modified', self.date_time_string(fs.st_mtime))
                    self.send_header('Access-Control-Allow-Origin', '*')
                    self.end_headers()
                    self.copyfile(f, self.wfile)
            else:
                logger.error(f"File not found: {file_path}")
                logger.info("Available files in directory:")
                for item in os.listdir(self.directory):
                    logger.info(f"  - {item}")
                self.send_error(404, f"File not found: {self.path}")
        except Exception as e:
            logger.error(f"Error serving {self.path}: {str(e)}")
            self.send_error(500, f"Internal server error: {str(e)}")

def get_build_dir():
    """Get the Next.js build directory path."""
    # Get the absolute path to the out directory
    out_dir = os.path.abspath(os.path.join(os.getcwd(), "out"))

    print("erere",out_dir)
    logger.info(f"Checking build directory: {out_dir}")
    if os.path.exists(out_dir):
        logger.info(f"Found build directory at: {out_dir}")
        logger.info("Directory contents:")
        for item in os.listdir(out_dir):
            logger.info(f"  - {item}")
        return out_dir

    raise FileNotFoundError(
        "Next.js build directory not found. "
        "Please run 'npm run build' first and ensure the 'out' directory exists."
    )

def find_free_port(start_port=8000, max_attempts=100):
    """Find an available port starting from start_port."""
    for port in range(start_port, start_port + max_attempts):
        try:
            with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
                s.bind(('localhost', port))
                return port
        except OSError:
            continue
    raise RuntimeError('No free ports found')

@st.cache_resource
def initialize_server():
    """Initialize the HTTP server (cached to prevent recreation)."""
    try:
        # Get build directory
        build_dir = get_build_dir()

        # Find available port
        port = find_free_port()
        logger.info(f"Starting server on port: {port}")

        # Create custom handler class with build directory
        handler = type('CustomHandler',
                      (NextJSHandler,),
                      {'directory': build_dir})

        # Start server
        httpd = HTTPServer(('localhost', port), handler)
        thread = threading.Thread(target=httpd.serve_forever, daemon=True)
        thread.start()
        logger.info("Server started successfully")

        return port, httpd, thread

    except Exception as e:
        logger.error(f"Server initialization failed: {str(e)}")
        st.error(f"Server initialization failed: {str(e)}")
        return None

# Initialize server once using cached resource
server_info = initialize_server()

if server_info is None:
    st.error("""
        Failed to start the server. Please ensure:
        1. You've run 'npm run build'
        2. The 'out' directory exists in your project root
        3. The build was successful
    """)
    st.stop()

port, _, _ = server_info

# Get available pages from build directory
build_dir = get_build_dir()
available_pages = [
    os.path.splitext(f)[0]
    for f in os.listdir(build_dir)
    if f.endswith('.html') and f != '404.html'
]
logger.info(f"Available pages: {available_pages}")

# Page selection
if "current_page" not in st.session_state:
    st.session_state.current_page = "index"

pages = {page.capitalize(): page for page in available_pages}

selected_page = st.selectbox(
    "Select Page",
    options=list(pages.keys()),
    index=0
)

st.session_state.current_page = pages[selected_page]

# Construct the URL
page_url = f"http://localhost:{port}/{st.session_state.current_page}"

# Debug information
with st.sidebar:
    st.markdown("### Debug Information")
    st.text(f"Current page: {st.session_state.current_page}")
    st.text(f"Server port: {port}")
    st.text(f"Full URL: {page_url}")
    st.text(f"Build directory: {build_dir}")

    if st.button("Show Available Files"):
        st.text("Files in build directory:")
        for item in os.listdir(build_dir):
            st.text(f"  - {item}")

# Embed the Next.js app
st.markdown(
    f"""
    <iframe
        src="{page_url}"
        height="1220px"
        style="width: 100%; font-family: 'Quicksand', sans-serif !important; border: none; border-radius: 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);"
    ></iframe>
    """,
    unsafe_allow_html=True
)
