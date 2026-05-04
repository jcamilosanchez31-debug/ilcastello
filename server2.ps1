$code = @"
using System;
using System.Net;
using System.IO;

public class SimpleWebServer
{
    public static void Start()
    {
        HttpListener listener = new HttpListener();
        listener.Prefixes.Add("http://localhost:8080/");
        listener.Start();
        Console.WriteLine("Server listening on port 8080");

        while (true)
        {
            try {
                HttpListenerContext context = listener.GetContext();
                HttpListenerRequest request = context.Request;
                HttpListenerResponse response = context.Response;

                string path = request.Url.LocalPath;
                if (path == "/") path = "/index.html";
                string localFile = Path.Combine(Environment.CurrentDirectory, path.TrimStart('/'));

                if (File.Exists(localFile))
                {
                    byte[] content = File.ReadAllBytes(localFile);
                    response.ContentLength64 = content.Length;
                    if (path.EndsWith(".css")) response.ContentType = "text/css";
                    else if (path.EndsWith(".js")) response.ContentType = "application/javascript";
                    else if (path.EndsWith(".jpg") || path.EndsWith(".jpeg")) response.ContentType = "image/jpeg";
                    else if (path.EndsWith(".png")) response.ContentType = "image/png";
                    else response.ContentType = "text/html; charset=utf-8";
                    
                    response.OutputStream.Write(content, 0, content.Length);
                }
                else
                {
                    response.StatusCode = 404;
                }
                response.Close();
            } catch (Exception) {
                // Ignore dropped connections
            }
        }
    }
}
"@
Add-Type -TypeDefinition $code
[SimpleWebServer]::Start()
