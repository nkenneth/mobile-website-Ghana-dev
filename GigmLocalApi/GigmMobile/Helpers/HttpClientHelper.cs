using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Web;
using System.Web.Script.Serialization;

namespace GIGMWEB.Models
{
    public class ErrorModel : ErrorMessage
    {
        public HttpStatusCode Code { get; set; }
    }
    public class ErrorMessage
    {
        public string Message { get; set; }
    }
    public class HttpClientHelper:IDisposable
    {
        readonly HttpClient client;
        public HttpClientHelper()
        {
            client=new HttpClient();
        }
            public async Task ProcessClientRequestAsync<T>(string location, HttpMethod method, object body, Action<T> success, Action<ErrorModel> error)
        {
            var requestMessage = new HttpRequestMessage(method, location);

            requestMessage.Headers.Accept.Clear();
            requestMessage.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            requestMessage.Headers.AcceptLanguage.Add(new StringWithQualityHeaderValue("en-us"));
            requestMessage.Headers.Authorization = new AuthenticationHeaderValue("Bearer", DevelopmentSettings.GIGMSToken);
           // requestMessage.Headers.Add("X-Version", DevelopmentSettings.ServerVersion);

            if (method != HttpMethod.Post)
            {
                body = null;
            }

            await SendRequestAsync(
                requestMessage,
                (response) =>
                {
                    if (success != null)
                    {
                        T toReturn;
                        try ////// ......................................Return
                        {
                            var converter = new IsoDateTimeConverter { DateTimeFormat = "MM/dd/yyyy hh:mm:ss" };
                            //var mList = JsonConvert.DeserializeObject<IDictionary<string, Items>>(response);
                            JavaScriptSerializer serializer = new JavaScriptSerializer();
                            toReturn = serializer.Deserialize<T>(response);
                            //toReturn = JsonConvert.DeserializeObject<T>(response);
                            //error = null;
                        }
                        catch (WebException ex)
                        {
                            var errorModel = GetErrorResponse(ex);
                            error(errorModel);
                            return;
                        }
                        success(toReturn);
                    }
                },
                (errorResponse) =>
                {
                    if (errorResponse != null)
                        error(errorResponse);
                }, body);
        }

        async Task SendRequestAsync(HttpRequestMessage request, Action<string> successAction, Action<ErrorModel> errorAction, object body)
        {
            //using (HttpClient client = new HttpClient())
            //{
            //var client = new HttpClient();
            if (body != null)
            {
                var serializedContent = JsonConvert.SerializeObject(body);
                HttpContent content = new StringContent(serializedContent, System.Text.Encoding.UTF8, "application/json");
                request.Content = content;

            }
            try
            {
                client.Timeout = new TimeSpan(0, 20, 0);
                var responseMessage = await client.SendAsync(request);

                var response = "";
                if (responseMessage.IsSuccessStatusCode)
                {
                    response = await responseMessage.Content.ReadAsStringAsync(); /// See Error

                    successAction(response);
                }
                else
                {
                    response = responseMessage.Content != null
                       ? await responseMessage.Content.ReadAsStringAsync()
                       : responseMessage.ReasonPhrase;

                    var errorModel = new ErrorModel
                    {
                        Message =response.Contains("\"message\":")? JsonConvert.DeserializeObject<ErrorMessage>(response).Message:response,
                        Code = responseMessage.StatusCode,
                    };
                    errorAction(errorModel);
                }
            }
            catch (WebException ex)
            {
                var error = GetErrorResponse(ex);
                errorAction(error);
            }
            // }
        }

        private ErrorModel GetErrorResponse(WebException ex)
        {
            var errorModel = new ErrorModel
            {
                Message = ex.InnerException != null ? ex.InnerException.InnerException != null ? ex.InnerException.InnerException.Message : ex.InnerException.Message
                : ex.Message,
                Code = ((HttpWebResponse)ex.Response).StatusCode,
            };

            return errorModel;
        }

        public void Dispose()
        {
            client.Dispose();
        }
    }
}