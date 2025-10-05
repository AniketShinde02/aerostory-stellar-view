import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import dotenv from 'dotenv';

// Load .env file manually
dotenv.config();

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load environment variables with proper prefix
  const env = loadEnv(mode, process.cwd(), '');
  const groqApiKey = env.VITE_GROQ_API_KEY || process.env.VITE_GROQ_API_KEY;
  
  console.log('Vite Config: Mode:', mode);
  console.log('Vite Config: API Key available:', !!groqApiKey);
  console.log('Vite Config: API Key length:', groqApiKey?.length || 0);
  console.log('Vite Config: All env vars:', Object.keys(env).filter(key => key.startsWith('VITE_')));
  console.log('Vite Config: Process env vars:', Object.keys(process.env).filter(key => key.startsWith('VITE_')));
  
  return {
    server: {
      host: "::",
      port: 8080,
      proxy: {
        '/api/groq': {
          target: 'https://api.groq.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/groq/, '/openai/v1'),
          configure: (proxy, _options) => {
            proxy.on('proxyReq', (proxyReq, req, _res) => {
              console.log('Proxy Request: Adding headers');
              const apiKey = groqApiKey || process.env.VITE_GROQ_API_KEY;
              if (apiKey) {
                proxyReq.setHeader('Authorization', `Bearer ${apiKey}`);
                console.log('Proxy: Authorization header set with key length:', apiKey.length);
              } else {
                console.error('Proxy: No API key found in environment!');
                console.error('Available env vars:', Object.keys(process.env).filter(key => key.includes('GROQ')));
              }
              proxyReq.setHeader('Content-Type', 'application/json');
            });
            
            proxy.on('proxyRes', (proxyRes, req, _res) => {
              console.log('Proxy Response:', proxyRes.statusCode);
            });
            
            proxy.on('error', (err, req, _res) => {
              console.error('Proxy Error:', err);
            });
          }
        }
      }
    },
    plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
