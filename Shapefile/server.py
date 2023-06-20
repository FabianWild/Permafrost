from http.server import SimpleHTTPRequestHandler
import socketserver

class CORSRequestHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()

# Specify the desired port number
PORT = 8000

# Start the server with the custom CORS request handler
with socketserver.TCPServer(("", PORT), CORSRequestHandler) as httpd:
    print("Server running on port", PORT)
    httpd.serve_forever()