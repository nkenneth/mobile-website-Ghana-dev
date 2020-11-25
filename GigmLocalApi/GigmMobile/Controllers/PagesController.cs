using GIGMWEB.Models;
using PayStack.Net;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace GigmMobile.Controllers
{
    [NoCache]
    public class PagesController : Controller
    {
        public ActionResult Index()
        {
            return base.View();
        }
       public ActionResult Booking()
        {
			return base.View();
        }

		public ActionResult App()
		{
			ViewBag.Message = "Your application App page.";
 			return View();
		}

		public ActionResult Terms()
		{

			ViewBag.Message = "Your application Terms & Conditions page.";
			return View();
		}

		public ActionResult Term()
		{

			ViewBag.Message = "Your application Terms & Conditions.";
			return View();
		}

		public ActionResult HireBus()
        {
            return base.View();      
        }

        public ActionResult SelectBus()
        {
            return base.View();
        }

        public ActionResult Passenger()
        {
            return base.View();
        }
        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return base.View();
        }

		public ActionResult Faq()
		{
			ViewBag.Message = "Your application Faq page.";

			return base.View();
		}
		public ActionResult campus()
		{
			ViewBag.Message = "Your application Campus page.";

			return base.View();
		}
		public ActionResult pickup()
		{
			ViewBag.Message = "Your application pickup page.";
			//done here
			return base.View();
		}
		public ActionResult backtoschool()
		{
			ViewBag.Message = "Your application Back to school page.";

			return base.View();
		}
		public ActionResult Enterprise()
		{
			ViewBag.Message = "Your application Enterprise page.";

			return base.View();
		}
		public ActionResult enterprise2()
		{
			ViewBag.Message = "Your application Enterprise page.";

			return View();
		}
		public ActionResult View()
		{
			ViewBag.Message = "Your application Terminal page";
			return base.View();
		}

		public ActionResult Terminals()
		{
			ViewBag.Message = "Your application Terminal page";
			return base.View();
		}
		public ActionResult Captain()
		{
			ViewBag.Message = "Your application captain page";
			return base.View();
		}
		public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return base.View();
        }
	
        public ActionResult SignUp()
        {
            return base.View();
        }
        public ActionResult ForgotPassword()
        {
            return base.View();
        }
        [HttpGet]
        public async Task <ActionResult> PayStackResponse(String trxref, String reference)
        {
            if (Session["PaystackDetails"] != null )
            {
                ViewBag.Status = false;

                try
                {
                    Logical.WriteToLog(((ProcessPayStackPayment)Session["PaystackDetails"]).PayStackReference);
                    ProcessPayStackPayment returnedBookingResponse = (ProcessPayStackPayment)Session["PaystackDetails"];

                    //starts here..
                    var bookingResult = await  Logical.PostPayStackPayment(returnedBookingResponse);

                    var bookingResult_ = ((PostSearchResponseModel)Session["booking"]).Object;

                    if (bookingResult_.Response.ToLower() == "approved")
                    {
                        var payrefres = bookingResult.Item1.Object.BookingReferenceCode as string;
                        var success = (bool)Session["success"];
                        //Session["queryRef"] = returnedBookingResponse.RefCode;
                        Session["queryRef"] = reference;
                        if (success == false)
                        {
                            Session["transactionDetails"] = bookingResult_;
                            Session["Errormsg"] = "Transaction Failed";
                            // Response.Redirect("Payment-Error.aspx?Ref=" + returnedBookingResponse.RefCode + "&Errormsg=" + bookingResult.Item2.Message + "", false);
                            return RedirectToAction("PaymentError");
                        }
                        if (payrefres == null)
                        {
                            payrefres = "-";
                        }

                        Session["transactionDetails"] = bookingResult_;

                        return RedirectToAction("PaymentConfirmation");
                    }
                    else
                    {
                        var transactionDetails = confirmPayStackTransaction(reference);

                        Session["PayStackDetails"] = transactionDetails;

                        String bank = transactionDetails.Data.Authorization.Bank;

                        return RedirectToAction("PaymentError");
                    }

                }
                catch (Exception ex)
                {

                  
                    Logical.WriteToLog(ex.Message + "::" + ex.StackTrace);

                    if ((bool)Session["Success"].Equals(true) )
                    {
                        Session["queryRef"] = reference;

                        if (((PostSearchResponseModel)Session["booking"]).Object.Response.ToLower() == "approved")
                        {
                            ViewData["tranDetails"] = Session["transactionDetails"] as PostSearchResponseModel;
                            return RedirectToAction("PaymentConfirmation");
                        }
                        else
                        {
                            Session["Errormsg"] = ((PostSearchResponseModel)Session["booking"]).Object.Response;

                            return RedirectToAction("PaymentError");
                        }
                    }

                    return RedirectToAction("PaymentError");

                }
                

            }
            else
            {
                ViewBag.HireService = true;
                return RedirectToAction("PaymentConfirmation");
            }
           
        }

        public ActionResult PaymentConfirmation()
        {
          
            //Hire Service
            if (Session["HireResponse_"] != null)
            {
                bool IsReturnTrp = false;


                if ((int)Session["roundTripHire"] == 1 )
                {
                    IsReturnTrp = true;
                }
                var hireRequestReturn = IsReturnTrp? (GetHireRefcodeRequestReturn)Session["HireRequest"] : null;
                var hireRequest = !IsReturnTrp ? (GetHireRefcodeRequest)Session["HireRequest"] : null;

                var hireResponse = new getVehicleForHireResponse ();
                var hireRefCodeAmountObj = new hireRefcodeAmount();

                var hirePageVm = new PaymentConfirmatonHire();

                try
                { 
                    hireResponse = (getVehicleForHireResponse)Session["HireResponse"];
                    hireRefCodeAmountObj = (hireRefcodeAmount)Session["HireResponse_"];
                    hirePageVm.BookingRequestReturn = hireRequestReturn;
                    hirePageVm.BookingRequest = hireRequest;
                    hirePageVm.BookingResponse = hireResponse;
                    hirePageVm.HirePayResponse = hireRefCodeAmountObj;

                    ViewBag.HireService = true;

                    var vhire = (getVehicleForHireResponse)Session["HireResponse"];

                  
                    return View(hirePageVm);
                }
                catch (Exception ex)
                {
                    Logical.WriteToLog(ex.Message);

                    return View(hirePageVm);

                }
            }
            else{

                var bookingRequest = new PostSearchModel();
                var tranDetals = new PostSearchResponseModel();
                tranDetals.Object = new PostSearchResponseModel.BookingResponse();

                String otherSeats = String.Empty;

                var pageVm = new PaymentConfirmaton();



                try
                {
                    tranDetals = (PostSearchResponseModel)Session["transactionDetails"];
                    pageVm.BookingResponse = tranDetals.Object;
                    pageVm.BookingRequest = (PostSearchModel)Session["BookingRequest"];


                    pageVm.BookingRequest.SeatNumber = pageVm.BookingRequest.SeatRegistrations.Split(':')[1];

                    int i = 0;
                    foreach (var item in pageVm.BookingRequest.Beneficiaries)
                    {
                        i++;
                        otherSeats += item.SeatNumber;

                        if (i < pageVm.BookingRequest.Beneficiaries.Count)
                        {
                            otherSeats += ":";
                        }
                    }

                    Session["OtherSeats"] = otherSeats;



                    // pageVm.BookingRequest.SeatRegistrations.Split


                }
                catch (Exception ex)
                {
                    Logical.WriteToLog(ex.Message + "::" + ex.StackTrace);

                    pageVm.BookingResponse = ((PostSearchResponseModel)Session["booking"]).Object;
                    pageVm.BookingRequest = (PostSearchModel)Session["BookingRequest"];

                    int i = 0;
                    foreach (var item in pageVm.BookingRequest.Beneficiaries)
                    {
                        i++;
                        otherSeats += item.SeatNumber;

                        if (i < pageVm.BookingRequest.Beneficiaries.Count)
                        {
                            otherSeats += ":";
                        }
                    }


                }

                ViewBag.Status = true;
                return View(pageVm);

            }


           
        }

        public async Task<ActionResult> FlutterwavePay(string refcode)
        {
            string queryRef = refcode;

            ProcessFlutterWavePayment flwpayment = new ProcessFlutterWavePayment();

            flwpayment.RefCode = queryRef;

            var bookingResult = await Logical.PostFlutterWavePayment(flwpayment);


            var error = bookingResult.Item2;
            Session["queryRef"] = flwpayment.RefCode;

            if (error != null)
            {
                Session["transactionDetails"] = bookingResult.Item1;
                Session["Errormsg"] = "Transaction Failed";
                return RedirectToAction("PaymentError");
            }

            if (bookingResult.Item1.Object != null)
            {
                Session["transactionDetails"] = bookingResult.Item1;
                //var refCode = 
                if (bookingResult.Item1.Object.Response.ToLower() == "approved")
                {
                    return RedirectToAction("PaymentConfirmation");
                }
                else
                {
                    Session["Errormsg"] = bookingResult.Item1.Object.Response;
                    return RedirectToAction("PaymentError");
                }
            }
            else
            {
                Session["Errormsg"] = "Transaction Failed";
                return RedirectToAction("PaymentError");
            }

        }

        public ActionResult PaymentError()
        {

            return base.View();
        }

        public ActionResult HireResult()
        {
            return base.View();
        }

        public ActionResult BookingStatus()
        {
            var booking = new BookingDetails.BookingPassengerDetails();
            booking = Session["bookingStatus"] as BookingDetails.BookingPassengerDetails;

            return View(booking);
        }

        public ActionResult Account()
        {
            return base.View();
        }

        public ActionResult BookOnHold(String refCode, String buttonId)
        {
            ViewBag.RefCode = refCode;
            ViewBag.ButtonId = buttonId;

      
            var pageVm = new PaymentConfirmaton();

            try
            {
               if (Session["transactionDetails"] != null && Session["BookingRequest"] != null)
                {

                }
              var  tranDetals = (PostSearchResponseModel)Session["transactionDetails"];
              pageVm.BookingResponse = tranDetals.Object;
              pageVm.BookingRequest = (PostSearchModel)Session["BookingRequest"];

             pageVm.BookingRequest.SeatNumber = pageVm.BookingRequest.SeatRegistrations.Split(':')[1];

            }
            catch (Exception ex)
            {
                bool IsReturnTrp = false;

                if ((int)Session["roundTripHire"] == 1)
                {
                    IsReturnTrp = true;
                }
                var hireRequestReturn = IsReturnTrp ? (GetHireRefcodeRequestReturn)Session["HireRequest"] : null;
                var hireRequest = !IsReturnTrp ? (GetHireRefcodeRequest)Session["HireRequest"] : null;

                var tranDetails = new PostSearchResponseModel.BookingResponse();
                var bookingRequest = new PostSearchModel();

                var hireResponse = new getVehicleForHireResponse();
                var hireRefCodeAmountObj = new hireRefcodeAmount();

                var hirePageVm = new PaymentConfirmatonHire();


                hireResponse = (getVehicleForHireResponse)Session["HireResponse"];
                hireRefCodeAmountObj = (hireRefcodeAmount)Session["HireResponse_"];
                hirePageVm.BookingRequestReturn = hireRequestReturn;
                hirePageVm.BookingRequest = hireRequest;
                hirePageVm.BookingResponse = hireResponse;
                hirePageVm.HirePayResponse = hireRefCodeAmountObj;

                ViewBag.HireService = true;
                tranDetails.BookingReferenceCode = hireRefCodeAmountObj.RefCode;
               

                if (IsReturnTrp)
                {
                    tranDetails.Amount = hireRequestReturn.Amount;
                    tranDetails.DepartureDate = hireRequestReturn.OnewayPickupDate;

                    bookingRequest.Amount = hireRequestReturn.Amount.ToString();
                    bookingRequest.FirstName = hireRequestReturn.FullName;
                    bookingRequest.Email = hireRequestReturn.Email;
                    bookingRequest.PhoneNumber = hireRequestReturn.PhoneNumber;
                    bookingRequest.PaymentMethod = Convert.ToInt32(hireRequestReturn.PaymentMethod);

                    pageVm.BookingRequest = bookingRequest;
                    pageVm.BookingResponse = tranDetails;
                }
                else
                {
                    tranDetails.Amount = hireRequest.Amount;
                    tranDetails.DepartureDate = hireRequest.OnewayPickupDate;

                    bookingRequest.Amount = hireRequest.Amount.ToString();
                    bookingRequest.FirstName = hireRequest.FullName;
                    bookingRequest.Email = hireRequest.Email;
                    bookingRequest.PhoneNumber = hireRequest.PhoneNumber;
                    bookingRequest.PaymentMethod = Convert.ToInt32(hireRequest.PaymentMethod);

                    pageVm.BookingRequest = bookingRequest;
                    pageVm.BookingResponse = tranDetails;
                }


                Logical.WriteToLog(ex.Message);

            }



            return View(pageVm);
        }

        public ActionResult HirePassenger()
        {
            return base.View();
        }

        public ActionResult Schedule()
        {
            return base.View();
        }
        public ActionResult ScheduleDetail(String id)
        {
            return base.View();
        }

        public ActionResult TripDetail(String routeId)
        {
            return base.View();
        }

        public ActionResult Terminal(String routeId)
        {
            return View();
        }
        protected string _GetSha256Hash(string value)
        {
           
            System.Security.Cryptography.SHA256Managed crypt = new System.Security.Cryptography.SHA256Managed();
            System.Text.StringBuilder hash = new System.Text.StringBuilder();
            byte[] crypto = crypt.ComputeHash(Encoding.UTF8.GetBytes(value), 0, Encoding.UTF8.GetByteCount(value));
            foreach (byte theByte in crypto)
            {
                hash.Append(theByte.ToString("x2"));
            }
            return hash.ToString(); ;
        }

        private TransactionVerifyResponse confirmPayStackTransaction(String refCode)
        {
            var testOrLiveSecret = ConfigurationManager.AppSettings["PayStackSecret"];

            var api = new PayStackApi(testOrLiveSecret);

            var transactionResponse = api.Transactions.Verify(refCode);

            return transactionResponse;
        }


    }

    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
    public sealed class NoCacheAttribute : ActionFilterAttribute
    {
        public override void OnResultExecuting(ResultExecutingContext filterContext)
        {
            filterContext.HttpContext.Response.Cache.SetExpires(DateTime.UtcNow.AddDays(-1));
            filterContext.HttpContext.Response.Cache.SetValidUntilExpires(false);
            filterContext.HttpContext.Response.Cache.SetRevalidation(HttpCacheRevalidation.AllCaches);
            filterContext.HttpContext.Response.Cache.SetCacheability(HttpCacheability.NoCache);
            filterContext.HttpContext.Response.Cache.SetNoStore();

            base.OnResultExecuting(filterContext);
        }
    }


}