using System;
using Newtonsoft.Json.Linq;
using RestSharp;

namespace RestSharpTask2
{
    public class Program
    {
        static void Main(string[] args)
        {
            var client = new RestClient("https://simple-books-api.glitch.me");

            
            var request = new RestRequest("/books", Method.Get);

          
            RestResponse response = client.Execute(request);

            // Check if status code is 200
            if (response.StatusCode == System.Net.HttpStatusCode.OK)
            {
                
                JArray jsonResponse = JArray.Parse(response.Content);

                // Display each book's id and name
                Console.WriteLine("Books:");
                foreach (JObject book in jsonResponse)
                {
                    int id = (int)book["id"];
                    string name = (string)book["name"];
                    Console.WriteLine($"ID: {id}, Name: {name}");
                }
            }
            else
            {
                Console.WriteLine("Error: " + response.ErrorMessage);
            }

            Console.WriteLine("Press any key to exit.");
            Console.ReadKey();
        }
    }
}
