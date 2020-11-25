using System.IO;
using System.Xml;

namespace GIGMWEB.Helper
{
    public class XmlToString
    {
        public string ConvertXmlToString(Stream InputStream)
        {
            string xmlData = "";
            using (var reader = new StreamReader(InputStream))
            {
                xmlData = reader.ReadToEnd();
            }

            XmlDocument doc = new XmlDocument();
            doc.LoadXml(xmlData);

            //string refCode = doc.SelectSingleNode("/CustomerInformationRequest/CustReference").InnerText;

            //BookingDetails refResults = await GetBookingRefDetails(refCode);

            string json = Newtonsoft.Json.JsonConvert.SerializeXmlNode(doc);

            return json;
        }
    }
}