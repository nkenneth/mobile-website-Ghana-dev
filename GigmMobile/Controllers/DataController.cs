using GIGMWEB.Models;
using PayStack.Net;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;
using System.Web.UI;

namespace GigmMobile.Controllers
{
    // [RoutePrefix("api/data")]
    public class DataController : Controller
    {
        // [Route("departure")]
        HttpClientHelper client = new HttpClientHelper();
        
        public async Task<JsonResult> getRoutes()
        {
            var departureTerminal = await Logical.GetDepartureTerminals();

            departureTerminal.Object.Items = departureTerminal.Object.Items.OrderBy(x => x.TerminalName).ToList();

            return new JsonResult { Data = departureTerminal, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }
       


        public async Task<JsonResult> getTravelDocumentType()
        {
            var traveldocument = await Logical.GetTravelDocuments();

            traveldocument.Object.Items = traveldocument.Object.Items.OrderBy(x => x.DocumentType).ToList();

            return new JsonResult { Data = traveldocument, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
      
        }


        public async Task<JsonResult> getRoutesByCountryCode(string countrycode)
        {
            var departureTerminal = await Logical.GetDepartureTerminalsBycountrycode(countrycode);

            departureTerminal.Object.Items = departureTerminal.Object.Items.OrderBy(x => x.TerminalName).ToList();

            return new JsonResult { Data = departureTerminal, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }

        public async Task<JsonResult> getDestinationRoutes(int terminalId)
        {
            var arrivalTerminal = await Logical.GetDestinationTerminals(terminalId);

            arrivalTerminal.Object = arrivalTerminal.Object.OrderBy(x => x.TerminalName).ToList();

            return new JsonResult { Data = arrivalTerminal, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }

        public async Task<JsonResult> loadBusForDay(VehicleTripRouteSearch vehicleTripRouteSearchModel)
        {


            VehicleTripRouteSearchResponse busfortheDay = new VehicleTripRouteSearchResponse();
            await client.ProcessClientRequestAsync<VehicleTripRouteSearchResponse>(GigUrl.GetVehicleforDay, HttpMethod.Post, vehicleTripRouteSearchModel,
            success =>
            {
                if (success != null)
                {
                    busfortheDay = success;

                    busfortheDay.Object.Arrivals = busfortheDay.Object.Arrivals.OrderBy(x => x.DepartureTime).ToList();
                    busfortheDay.Object.Departures = busfortheDay.Object.Departures.OrderBy(x => x.DepartureTime).ToList();
                }
                else
                {

                }

            },
                error =>
                {

                }
            );

            return new JsonResult { Data = busfortheDay };

        }

        //

        [HttpPost]
        public async Task<JsonResult> login(GigmsSignInModel user)
        {

            if (user != null)
            {
                var loginResponse = await Logical.SignIn(user);

                return new JsonResult { Data = loginResponse };
            }

            return new JsonResult { Data = null, JsonRequestBehavior = JsonRequestBehavior.AllowGet };

        }
        [HttpPost]
        public async Task<JsonResult> signUp(SignUpModel newUser)
        {
            var response = await Logical.Register(newUser);
            return new JsonResult { Data = response };
        }
        public async Task<JsonResult> GetActivationCode(PasswordActivationCode details)
        {
            var activationResponse = await Logical.GetActivationCode(details);

            return new JsonResult { Data = activationResponse };
        }

        public async Task<JsonResult> ForgotPassword(PasswordReset obj)
        {
            var result = new Object();
            try
            {
                var result_ = await Logical.ForgotPassword(obj);

                return new JsonResult { Data = result_ };
            }
            catch (Exception ex)
            {

                Logical.WriteToLog(ex.Message);
            }


            return new JsonResult { Data = result };
        }


        public async Task<JsonResult> getAllPickUpRoutes(String tripId)
        {
            var pickUpRoutes = await Logical.GetAllPickuproutes(tripId);

            pickUpRoutes.Object = pickUpRoutes.Object.OrderBy(p => p.TerminalName).ToList();

            return new JsonResult { Data = pickUpRoutes, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }


        [HttpPost]
        public async Task<JsonResult> PostBooking(PostSearchModel booking)
        {
            Session["BookingRequest"] = booking;
            booking.Discount = 0;
            var payStackUrl = String.Empty;

            try
            {


                if (booking.Beneficiaries == null)
                {
                    booking.Beneficiaries = new List<GigmsBookingBeneficiary>();
                }
            }
            catch (Exception ex)
            {
                Console.Write(ex);
                booking.Beneficiaries = new List<GigmsBookingBeneficiary>();
            }
           
            
            var response = await Logical.PostSearchObjects(booking);

            if (!response.Item1.Code.Equals("200"))
            {
                return new JsonResult { Data = null };
            }


            Session["transactionDetails"] = response.Item1;
            var amount = Convert.ToInt64(booking.Amount) * 100;


            // var response = api.Transactions.Initialize(email, (int)amount);


            //Flutterwave
            if (booking.PaymentMethod.Equals(8))
            {
                Tuple<String, String, String> response_ = new Tuple<string, string, String>("", "", "");
                if (!String.IsNullOrEmpty(response.Item1.Object.BookingReferenceCode))
                {
                    var pubKey = ConfigurationManager.AppSettings["FlutterWavePublicKey"];  
                    var secKey = ConfigurationManager.AppSettings["FlutterWaveSecretKey"];
                    var txref = response.Item1.Object.BookingReferenceCode;
                    var redirectUrl = ConfigurationManager.AppSettings["FlutterWaveRedirect"] + txref;
                    //PBFPubKey.Text + amount.Text + "NG" + "NGN" + customer_email.Text + "card" + 1 + redirect_url.Text + txref.Text + secKey
                    var hash = _GetSha256Hash(pubKey + booking.Amount.Split(new String[] { "." }, StringSplitOptions.None)[0] + "NG" + "NGN" + booking.Email + "card" + 1 + redirectUrl + txref + secKey);

                    response_ = new Tuple<String, String, String>(response.Item1.Object.BookingReferenceCode, hash, redirectUrl);
                }

                return new JsonResult { Data = response_ };
            }
            //PaySwitch
            else if (booking.PaymentMethod.Equals(21))
            {
                Tuple<String, String, String> response_ = new Tuple<string, string, String>("", "", "");
                if (!String.IsNullOrEmpty(response.Item1.Object.BookingReferenceCode))
                {
                    
                      var pubKey = ConfigurationManager.AppSettings["thetellerKey"];
                    var buttonurl = ConfigurationManager.AppSettings["buttonurl"];

                    var usernameKey = ConfigurationManager.AppSettings["thetellerUsername"];
                    var secKey = ConfigurationManager.AppSettings["thetellerSecretKey"];
                    var txref = response.Item1.Object.TransactionRefCode;
                    var redirectUrl = ConfigurationManager.AppSettings["theTellerResponseUrl"] + txref;

                    var hash = _GetSha256Hash(usernameKey + booking.Amount.Split(new String[] { "." }, StringSplitOptions.None)[0] + "GH" + "GHS" + booking.Email + "card" + 1 + redirectUrl + txref + pubKey + secKey);

                    response_ = new Tuple<String, String, String>(response.Item1.Object.TransactionRefCode, hash, redirectUrl);
                }

                return new JsonResult { Data = response_ };
            }

            //Paystack
            else if (booking.PaymentMethod.Equals(5))
            {
                var request = new TransactionInitializeRequest();
                request.Email = booking.Email;
                request.AmountInKobo = (int)amount;
                request.CallbackUrl = ConfigurationManager.AppSettings["PaystackResponse"];
                request.MetadataObject["cancel_action"] = ConfigurationManager.AppSettings["PaystackResponse"];
                request.Reference = response.Item1.Object.BookingReferenceCode;
                string testOrLiveSecret = string.Empty;

                if (booking.Currency == "GH¢")
                {
                    testOrLiveSecret = ConfigurationManager.AppSettings["PayStackSecretGH"];

                }
                else if (booking.Currency == "NGN")
                {

                    testOrLiveSecret = ConfigurationManager.AppSettings["PayStackSecret"];
                    request.SubAccount = ConfigurationManager.AppSettings["PaystackSubAccount"] ?? "";
                }
                else
                {
                    return new JsonResult { Data = null };

                }

                var api = new PayStackApi(testOrLiveSecret);

                try
                {
                    var payStackResponse = api.Transactions.Initialize(request);

                    if (payStackResponse.Status)
                    {
                        var PaystackDetails = new ProcessPayStackPayment
                        {
                            amount = (int)amount,
                            RefCode = request.Reference,
                            PayStackReference = payStackResponse.Data.Reference,
                            email = request.Email

                        };
                        Session["PaystackDetails"] = PaystackDetails;
                        payStackUrl = payStackResponse.Data.AuthorizationUrl;

                        return new JsonResult { Data = payStackUrl };
                    }
                    else
                    {
                        return new JsonResult { Data = null };

                    }

                }
                catch (Exception ex)
                {

                    Logical.WriteToLog(ex.Message);


                    return new JsonResult { Data = null };

                }

            }

            else if (booking.PaymentMethod.Equals(12))
            {

                var buttonId = "lnkbtnGtbUssd";
                Session["PaymentGatewayType"] = 12;

                var returnUrl = "/Pages/BookOnHold?refCode=" + response.Item1.Object.BookingReferenceCode + "&buttonId=" + buttonId;

                return new JsonResult { Data = returnUrl };
            }
            else if (booking.PaymentMethod.Equals(7) || booking.PaymentMethod.Equals(10) || booking.PaymentMethod.Equals(12) ||
                booking.PaymentMethod.Equals(14) || booking.PaymentMethod.Equals(16))
            {
                var buttonId = "ussd";
                Session["PaymentGatewayType"] = 0;

                var returnUrl = "/Pages/BookOnHold?refCode=" + response.Item1.Object.BookingReferenceCode + "&buttonId=" + buttonId;

                return new JsonResult { Data = returnUrl };
            }
            else
                return null;
        }

        public async Task<JsonResult> getBookingDetails(String refcode)
        {
            var result = await Logical.GetBookingDetailsByRef(refcode);

            if (result.Item1.Object != null)
            {
                Session["bookingStatus"] = result.Item1.Object;
            }

            return new JsonResult { Data = result, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }


        public async Task<JsonResult> getCountryDetails(String countryCode)
        {
            var result = await Logical.getCountryDetailsByCountryCode(countryCode);

            return new JsonResult { Data = result, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }

        public async Task<JsonResult> processGoogleMap(HireBusVm data)
        {
            var origins = data.DeparturePoint;
            var destinations = data.DestinationPoint;
            DistanceDouble distance = new DistanceDouble();
            var departLat = 0.00;
            var departLng = 0.00;
            var departCord = "";

            var arriveLat = 0.00;
            var arriveLng = 0.00;
            var arriveCord = "";

            string resultxml = string.Empty;

            string urlDepart = "https://maps.googleapis.com/maps/api/geocode/json?address=" + origins + "&key=" + ConfigurationManager.AppSettings["GoogleAPIKey"] + "";
            string urlArrive = "https://maps.googleapis.com/maps/api/geocode/json?address=" + destinations + "&key=" + ConfigurationManager.AppSettings["GoogleAPIKey"] + "";

            try
            {
                mapRootObject MapResponseJsonDepart = await Logical.GetDepartCord(urlDepart);

                List<mapResult> googleResponseElementDepart = MapResponseJsonDepart.results;

                if (googleResponseElementDepart.Count > 0)
                {
                    foreach (mapResult rowDepart in googleResponseElementDepart)
                    {
                        departLat = rowDepart.geometry.location.lat;
                        departLng = rowDepart.geometry.location.lng;
                        departCord = departLat + "," + departLng;
                    }
                }


                mapRootObject MapResponseJsonArrive = await Logical.GetArriveCord(urlArrive);
                List<mapResult> googleResponseElementArrive = MapResponseJsonArrive.results;

                if (googleResponseElementArrive.Count > 0)
                {
                    foreach (mapResult rowArrive in googleResponseElementArrive)
                    {
                        arriveLat = rowArrive.geometry.location.lat;
                        arriveLng = rowArrive.geometry.location.lng;
                        arriveCord = arriveLat + "," + arriveLng;
                    }
                }


            }
            catch (Exception ex)
            {
                Logical.WriteToLog(ex.Message + "\n" + ex.Source + "\n" + ex.StackTrace);
            }

            try
            {
                string url = "https://maps.googleapis.com/maps/api/distancematrix/json?origins=" + departCord + "&destinations=" + arriveCord + "&mode=driving&key=" + ConfigurationManager.AppSettings["GoogleAPIKey"] + "";

                GoogleRootObject GoogleMapResponseJson = await Logical.GetDistance(url);
                List<Row> googleResponseElement = GoogleMapResponseJson.rows;
                if (googleResponseElement.Count > 0)
                {
                    foreach (Row row in googleResponseElement)
                    {
                        List<Element> elements = row.elements;
                        foreach (Element element in elements)
                        {
                            distance.distanceInKiloMeter = Convert.ToDouble(element.distance.value / 1000.00);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                Logical.WriteToLog(ex.Message + "\n" + ex.Source + "\n" + ex.StackTrace);
            }

            Session["distance"] = distance;

            await StartHire(data);

            var hiredResponse = (getVehicleForHireResponse)Session["HireResponse"];

            String page = Session["pageTogo"] as String;

            Tuple<DistanceDouble, String, getVehicleForHireResponse> response = new Tuple<DistanceDouble, String, getVehicleForHireResponse>(distance, page, hiredResponse);
            return new JsonResult { Data = response, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }

        public async Task<JsonResult> CustomerBookings(String Id)
        {
            if (!String.IsNullOrEmpty(Id))
            {
                var detail = await Logical.CustomerBookings(Id.Trim());

                return new JsonResult { Data = detail, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
            else
                return new JsonResult { Data = null, JsonRequestBehavior = JsonRequestBehavior.AllowGet };

        }

        public async Task<JsonResult> PostHireBookingReturn(GetHireRefcodeRequestReturn hireRequest)
        {

            var response = await Logical.GetHireRefcodeReturn(hireRequest);

            IPayStackApi api = new PayStackApi("");
            TransactionInitializeRequest request = new TransactionInitializeRequest();

            Session["HireResponse_"] = response.Item1.Object;
            Session["HireRequest"] = hireRequest;

            //HireRefCodeReturn call is successful  and payment method is paystack
            if (response.Item1 != null && hireRequest.PaymentMethod.Equals("5"))
            {

                try
                {

                    request.Email = hireRequest.Email;
                    request.AmountInKobo = Convert.ToInt32(hireRequest.Amount) * 100;
                    //request.AmountInKobo = (int)Session["roundTripHire"] == 0 ? request.AmountInKobo : request.AmountInKobo * 2;
                    request.CallbackUrl = ConfigurationManager.AppSettings["PaystackResponse"];
                    request.MetadataObject["cancel_action"] = ConfigurationManager.AppSettings["PaystackResponse"];
                    request.Reference = response.Item1.Object.RefCode;

                    var testOrLiveSecret = ConfigurationManager.AppSettings["PayStackSecret"];
                    api = new PayStackApi(testOrLiveSecret);
                }
                catch (Exception ex)
                {


                    return new JsonResult { Data = new Tuple<String, String>("failed", ex.Message) };
                }


                //Tuple<String, String> returnObject = new Tuple<string, string>("", "");

                try
                {
                    var payStackResponse = api.Transactions.Initialize(request);

                    if (payStackResponse.Status)
                    {
                        var PaystackDetails = new ProcessPayStackPayment
                        {
                            amount = (int)request.AmountInKobo,
                            RefCode = request.Reference,
                            PayStackReference = payStackResponse.Data.Reference,
                            email = request.Email

                        };
                        Session["PaystackHireDetails"] = PaystackDetails;

                        Tuple<String, String, getHireRefcodeResponse> returnObject
                                     = new Tuple<string, string, getHireRefcodeResponse>(payStackResponse.Data.AuthorizationUrl, "", response.Item1);

                        return new JsonResult { Data = returnObject };
                    }
                    else
                    {
                        Tuple<String, String> returnObject = new Tuple<string, string>(String.Empty, "failed");
                        return new JsonResult { Data = returnObject };
                    }

                }
                catch (Exception ex)
                {

                    Logical.WriteToLog(ex.Message);


                    return new JsonResult { Data = new Tuple<String, String>("failed", ex.Message) };

                }
            }
            else if (hireRequest.PaymentMethod == "12")
            {

                var buttonId = "BankTransfer";
                Session["PaymentGatewayType"] = 12;

                var returnUrl = "/Pages/BookOnHold?refCode=" + response.Item1.Object.RefCode + "&buttonId=" + buttonId;

                return new JsonResult { Data = returnUrl };
            }


            return new JsonResult { Data = new Tuple<String, String>("failed", "Server error") };
        }



        public async Task<JsonResult> PostHireBooking(GetHireRefcodeRequest hireRequest)
        {

            var response = await Logical.GetHireRefcode(hireRequest);

            IPayStackApi api = new PayStackApi("");
            TransactionInitializeRequest request = new TransactionInitializeRequest();

            Session["HireResponse_"] = response.Item1.Object;
            Session["HireRequest"] = hireRequest;

            //HireRefCodeReturn call is successful  and payment method is paystack
            if (response.Item1.Code == "200" && hireRequest.PaymentMethod == "5")
            {

                try
                {

                    request.Email = hireRequest.Email;
                    request.AmountInKobo = Convert.ToInt32(hireRequest.Amount) * 100;
                    // request.AmountInKobo = (int)Session["roundTripHire"] == 0 ? request.AmountInKobo : request.AmountInKobo * 2;
                    request.CallbackUrl = ConfigurationManager.AppSettings["PaystackResponse"];
                    request.MetadataObject["cancel_action"] = ConfigurationManager.AppSettings["PaystackResponse"];
                    request.Reference = response.Item1.Object.RefCode;
                    request.SubAccount = ConfigurationManager.AppSettings["PaystackSubAccount"] ?? "";

                    var testOrLiveSecret = ConfigurationManager.AppSettings["PayStackSecret"];
                    api = new PayStackApi(testOrLiveSecret);


                    try
                    {
                        var payStackResponse = api.Transactions.Initialize(request);

                        if (payStackResponse.Status)
                        {
                            var PaystackDetails = new ProcessPayStackPayment
                            {
                                amount = (int)request.AmountInKobo,
                                RefCode = request.Reference,
                                PayStackReference = payStackResponse.Data.Reference,
                                email = request.Email

                            };
                            Session["PaystackHireDetails"] = PaystackDetails;

                            Tuple<String, String, getHireRefcodeResponse> returnObject
                                         = new Tuple<string, string, getHireRefcodeResponse>(payStackResponse.Data.AuthorizationUrl, "", response.Item1);

                            return new JsonResult { Data = returnObject };
                        }
                        else
                        {
                            Tuple<String, String> returnObject = new Tuple<string, string>(String.Empty, "failed");
                            return new JsonResult { Data = returnObject };
                        }

                    }
                    catch (Exception ex)
                    {

                        Logical.WriteToLog(ex.Message);


                        return new JsonResult { Data = new Tuple<String, String>("failed", ex.Message) };

                    }
                }
                catch (Exception ex)
                {


                    return new JsonResult { Data = new Tuple<String, String>("failed", ex.Message) };
                }


                //Tuple<String, String> returnObject = new Tuple<string, string>("", "");


            }
            else if (hireRequest.PaymentMethod == "12")
            {

                var buttonId = "BankTransfer";
                Session["PaymentGatewayType"] = 12;

                var returnUrl = "/Pages/BookOnHold?refCode=" + response.Item1.Object.RefCode + "&buttonId=" + buttonId;

                return new JsonResult { Data = returnUrl };
            }
            else if (!String.IsNullOrEmpty(response.Item1.Code) && response.Item1.Code != "200")
            {
                return new JsonResult { Data = new Tuple<String, String>("failed", response.Item1.ShortDescription) };
            }


            return new JsonResult { Data = new Tuple<String, String>("failed", "Server error") };
        }



        private async Task<ActionResult> StartHire(HireBusVm data)
        {

            var HireDeparture = data.DeparturePoint.ToString();
            var HireDestination = data.DestinationPoint.ToString();

            DistanceDouble DistanceModel = (DistanceDouble)Session["distance"];

            double distanceInKiloMeter = DistanceModel.distanceInKiloMeter;
            if (distanceInKiloMeter == 0)
            {
                // ScriptManager.RegisterStartupScript(this.Page, Page.GetType(), "text", "Func()", true);
            }
            else
            {
                Session["kilometerdis"] = distanceInKiloMeter;

                var origins = HireDeparture;
                var destinations = HireDestination;

                Session["origins"] = HireDeparture;
                Session["destinations"] = HireDestination;

                GetHireVehicleRequest getHireVehicleRequest = new GetHireVehicleRequest();
                GetHireVehicleRequestReturn getHireVehicleRequestReturn = new GetHireVehicleRequestReturn();

                getHireVehicleRequest.HiredServiceType = 0;
                if (data.TripType == 2)
                {
                    Session["roundTripHire"] = 1;
                    getHireVehicleRequest.HiredServiceType = 1;
                    getHireVehicleRequestReturn.HiredServiceType = 1;
                    getHireVehicleRequestReturn.OnewayDistanceApart = distanceInKiloMeter.ToString();
                    getHireVehicleRequestReturn.OnewayPickupLocation = origins;
                    getHireVehicleRequestReturn.OneWayDropoffLocation = destinations;
                    getHireVehicleRequestReturn.OnewayPickupDate = data.DepartureDate;
                    getHireVehicleRequestReturn.ReturnDistanceApart = distanceInKiloMeter.ToString();
                    getHireVehicleRequestReturn.ReturnDropoffLocation = origins;
                    getHireVehicleRequestReturn.ReturnPickupDate = data.ReturnDate;
                    getHireVehicleRequestReturn.ReturnPickupLocation = destinations;
                    Session["ReturnHireDate"] = data.ReturnDate;

                    if (data.RetainOvernight == true)
                    {
                        getHireVehicleRequest.IsSleepOver = true;
                        getHireVehicleRequestReturn.IsSleepOver = true;
                        Session["IsSleepOver"] = 1;

                    }
                }
                else
                {
                    Session["roundTripHire"] = 0;
                }

                getHireVehicleRequest.OnewayPickupLocation = origins;
                getHireVehicleRequest.OneWayDropoffLocation = destinations;
                getHireVehicleRequest.OnewayDistanceApart = distanceInKiloMeter.ToString();
                getHireVehicleRequest.OnewayPickupDate = data.DepartureDate;
                Session["DistanceApart"] = distanceInKiloMeter.ToString();

                getVehicleForHireResponse VehicleForHireResponse = new getVehicleForHireResponse();
                if (data.TripType == 2)
                {
                    VehicleForHireResponse = await Logical.GetBusesForHireReturn(getHireVehicleRequestReturn);
                    Session["HireResponse"] = VehicleForHireResponse;
                    Session["Hiredate"] = data.DepartureDate;
                    Session["HireReturndate"] = data.ReturnDate;
                    Session["pageTogo"] = "/Pages/HireResult";
                    return RedirectToAction("HireResult", "Pages");
                }
                else
                {
                    VehicleForHireResponse = await Logical.GetBusesForHire(getHireVehicleRequest);
                    Session["HireResponse"] = VehicleForHireResponse;
                    Session["Hiredate"] = data.DepartureDate;
                    // Response.Redirect("Hire-Result.aspx", false);
                    Session["pageTogo"] = "/Pages/HireResult";
                    return RedirectToAction("HireResult", "Pages");
                }

                #region MyRegion

                #endregion
            }

            Session["pageTogo"] = "/Pages/HireResult";
            return RedirectToAction("HireResult", "Pages");

        }

        public async Task<JsonResult> GetTerminals()
        {
            var terminals = await Logical.GetTerminals();




            return new JsonResult { Data = terminals, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }
        //GetTripByRoute

        public async Task<JsonResult> GetSchedule(int terminalId)
        {
            var schedules = await Logical.GetScheduleForTerminal(terminalId);

            schedules.Item1.Object = schedules.Item1.Object.Where(x => x.AvailableOnline.Equals(true)).ToList();

            return new JsonResult { Data = schedules, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }
        public async Task<JsonResult> GetTripByRoute(int routeId)
        {
            var trips = await Logical.GetTripByRoute(routeId);

            trips.Item1.Object = trips.Item1.Object.Where(x => x.AvailableOnline.Equals(true)).ToList();

            return new JsonResult { Data = trips, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }

        [HttpPost]
        public async Task<JsonResult> SavePartnerEnquiry(PartnerEnquiryDto enquiry)
        {
            enquiry.NumberOfVehicles = enquiry.Vehicles != null ? enquiry.Vehicles.Count.ToString() : "0";

            if (enquiry.Vehicles == null)
            {
                enquiry.Vehicles = new List<PartnerVehicleDto>();
            }
            //else
            //{
            //    foreach (var item in enquiry.Vehicles)
            //    {
            //        if (!String.IsNullOrEmpty(item.OtherColor))
            //            item.Colour = item.OtherModel;
            //        if (!String.IsNullOrEmpty(item.OtherModel))
            //            item.VehicleModel = item.OtherModel;
            //    }
            //}

            enquiry.Name = $"{enquiry.FirstName} {enquiry.MiddleName} {enquiry.LastName}";



            var partner = await Logical.SaveParnerEnquiry(enquiry);

            return new JsonResult { Data = partner };

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



    }
}
