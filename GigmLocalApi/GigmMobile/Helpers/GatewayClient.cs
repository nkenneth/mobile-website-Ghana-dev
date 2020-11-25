//using System;
//using System.Collections.Generic;
//using System.IO;
//using System.Linq;
//using System.Net;
//using System.Security.Cryptography.X509Certificates;
//using System.Text;
//using System.Xml;

//namespace Gig.PaymentGateway.Client
//{
//    /// <summary>
//    /// Client for accessing the Unified Payments gateway.
//    /// </summary>
//    public sealed class GatewayClient 
//    {
//        readonly X509Certificate _clientCertificate;
//        readonly IGatewayConfig _config;
//        //private ILogger log;

//        /// <summary>
//        /// Returns the parameter separator, if one has been configured.
//        /// </summary>
//        public string UseParameterSeparator => _config.UseParamSeparator;

//         public GatewayClient(IGatewayConfig config)
//        {
//            _config = config;

//            var store = new X509Store(StoreLocation.LocalMachine);
//            store.Open(OpenFlags.ReadOnly | OpenFlags.OpenExistingOnly);
//            var certs = store.Certificates.Find(X509FindType.FindBySubjectName, config.MerchantId, false);
//            if (certs.Count == 0)
//            {
//                //.Warn(@"Unable to load valid certificate for merchant ""{0}"" from store ""{1}""", config.MerchantId, store.Name);
//                throw new ApplicationException($@"No valid certificate found for ""{config.MerchantId}"".");
//            }

//            _clientCertificate = certs[0];
//            store.Close();

//            ServicePointManager.Expect100Continue = true;
//            ServicePointManager.SecurityProtocol = SecurityProtocolType.Ssl3;
//            ServicePointManager.ServerCertificateValidationCallback += (req, cert, chain, errors) => true;
//        }

//        public string SendRequest(string xml = null)
//        {
//            ServicePointManager.Expect100Continue = true;
//            ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls;

//            var req = WebRequest.Create(_config.GatewayUrl) as HttpWebRequest;
//            req.ContentType = "application/xml; charset=utf-8";
//            req.ClientCertificates.Add(_clientCertificate);
//            req.Method = "POST";

//            using (var @out = req.GetRequestStream())
//            {
//                //log.Debug("Writing request XML to output stream:\n{0}", xml);
//                byte[] body = Encoding.UTF8.GetBytes(xml.Trim());
//                @out.Write(body, 0, body.Length);
//            }

//            string xmlResponse;
//            using (var @in = req.GetResponse().GetResponseStream())
//            {
//                xmlResponse = new StreamReader(@in).ReadToEnd();
//            }

//            return xmlResponse;
//        }

//        public CreateOrderResponse CreateOrder(CreateOrderRequest req)
//        {
//            var xml = SendRequest(req.ToXml(_config));
//            var rdr = new XmlTextReader(new StringReader(xml));
//            var ret = new CreateOrderResponse();

//            while (rdr.Read())
//            {
//                if (rdr.NodeType == XmlNodeType.Element)
//                {
//                    switch (rdr.Name)
//                    {
//                        case "Status":
//                            ret.Status = rdr.ReadString();
//                            break;
//                        case "OrderID":
//                            ret.OrderId = rdr.ReadString();
//                            break;
//                        case "SessionID":
//                            ret.SessionId = rdr.ReadString();
//                            break;
//                        case "URL":
//                            ret.Url = rdr.ReadString();
//                            break;
//                    }
//                }
//            }

//            return ret;
//        }

//        public OrderStatusResponse GetOrderStatus(OrderStatusRequest req)
//        {
//            var xml = SendRequest(req.ToXml(_config));
//            var rdr = new XmlTextReader(new StringReader(xml));
//            var ret = new OrderStatusResponse();

//            while (rdr.Read())
//            {
//                if (rdr.NodeType == XmlNodeType.Element)
//                {
//                    switch (rdr.Name)
//                    {
//                        case "Status":
//                            ret.Status = rdr.ReadString();
//                            break;
//                        case "OrderID":
//                            ret.OrderId = rdr.ReadString();
//                            break;
//                        case "OrderStatus":
//                            ret.OrderStatus = rdr.ReadString();
//                            break;
//                        case "Receipt":
//                            var bytes = Convert.FromBase64String(rdr.ReadString());
//                            ret.Receipt = Encoding.UTF8.GetString(bytes);
//                            break;
//                    }
//                }
//            }

//            return ret;
//        }

//        public OrderReversalResponse ReverseOrder(OrderReversalRequest req)
//        {
//            var xml = SendRequest(req.ToXml(_config));
//            var rdr = new XmlTextReader(new StringReader(xml));
//            var ret = new OrderReversalResponse();

//            while (rdr.Read())
//            {
//                if (rdr.NodeType == XmlNodeType.Element)
//                {
//                    switch (rdr.Name)
//                    {
//                        case "Status":
//                            ret.Status = rdr.ReadString();
//                            break;
//                        case "OrderID":
//                            ret.OrderId = rdr.ReadString();
//                            break;
//                        case "RespCode":
//                            ret.ResponseCode = rdr.ReadString();
//                            break;
//                        case "RespMessage":
//                            ret.Response = rdr.ReadString();
//                            break;
//                    }
//                }
//            }

//            return ret;
//        }
//    }
//}
