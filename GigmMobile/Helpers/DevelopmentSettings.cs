using System;
namespace GIGMWEB.Models
{
    public class DevelopmentSettings
    {
        public static bool SandBox => Convert.ToBoolean(System.Configuration.ConfigurationManager.AppSettings["TestServer"]);

        public static string ServerVersion => System.Configuration.ConfigurationManager.AppSettings["::ServiceVersion"];

        public static Uri WebPayUrl => SandBox ? new Uri(System.Configuration.ConfigurationManager.AppSettings["WebPayTest"]) : new Uri(System.Configuration.ConfigurationManager.AppSettings["WebPayLive"]);

        public static string InterswitchMacKey => SandBox ? System.Configuration.ConfigurationManager.AppSettings["InterswtichKeyTest"] : System.Configuration.ConfigurationManager.AppSettings["InterswtichLiveKey"];

        public static string InterswitchProductId => SandBox ? "6205" : "5064";

        public static string InterswitchPayItemId => "101";

        public static string UnifiedPaymentCreateOrderUrl => WebServiceBaseUrl + "MobilePayment/UnifiedPaymentCreateOrder";

        public static string GIGMSToken => SandBox ? System.Configuration.ConfigurationManager.AppSettings["GIGMSToken"] : System.Configuration.ConfigurationManager.AppSettings["GIGMSToken"];

        //public static string WebServiceBaseUrl => SandBox ? "http://192.168.2.106/service/client/"
        //: "http://client.gigmops.com/client/";

        //public static string WebServiceBaseUrl => SandBox ? "http://localhost/service/client/"
        //: "http://client.gigmops.com/client/";

        //public static string WebServiceBaseUrl => SandBox ? "https://client.gigmobilitysystem.com/"
        //: "http://client.thegigmobility.com/";

        //don't change
        // public static string WebServiceBaseUrl => SandBox ? "https://client.gigmobilitysystem.com/"
        //: "http://client.thegigmobility.com/";


        //ghana test endpoint 
        public static string WebServiceBaseUrl => SandBox ? "http://client.thegigmobility.com/"
	 : "http://client.thegigmobility.com/";

        //public static string WebServiceBaseUrl => SandBox ? System.Configuration.ConfigurationManager.AppSettings["WebServiceTest"]
        //: System.Configuration.ConfigurationManager.AppSettings[n"WebServiceLive"];
        public static string WebServiceApiKey => SandBox ?
            System.Configuration.ConfigurationManager.AppSettings["WebServiceApiKeyTest"] : System.Configuration.ConfigurationManager.AppSettings["WebServiceApiKeyLive"];

        //"0o2pUAzrAmnIQ5Dp7nqI3pU+1j+BCwJk2RZn8+/+/SjnKJAVNFGsJNhjTq+TmEOc0aw0qNLkwn5bbDFrEqKbug=="


        public const Int32 port = 13;
        static string BaseUrl => WebServiceBaseUrl;


    }
}






























