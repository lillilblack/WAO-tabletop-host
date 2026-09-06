"""Serve only the public prototype folder; never expose project documents or old APIs."""
import argparse
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--lan', action='store_true', help='Allow trusted LAN tablets to connect')
    parser.add_argument('--port', type=int, default=8765)
    args = parser.parse_args()
    class Handler(SimpleHTTPRequestHandler):
        extensions_map = {**SimpleHTTPRequestHandler.extensions_map, '.mjs': 'text/javascript'}
        def list_directory(self, path):
            self.send_error(403, 'Directory listing disabled')
            return None
    handler = partial(Handler, directory=str(Path(__file__).resolve().parent))
    server = ThreadingHTTPServer(('0.0.0.0' if args.lan else '127.0.0.1', args.port), handler)
    print(f'WAO touchscreen: http://localhost:{args.port}', flush=True)
    if args.lan:
        print('LAN mode: use your laptop LAN address on a trusted Wi-Fi. No router port forwarding.', flush=True)
    server.serve_forever()
