using GIGMWEB.Helper;
using RestSharp;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Mail;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Web;
using System.Web.Hosting;
using System.Web.Script.Serialization;

namespace GIGMWEB.Models
{
    public class Logical
    {
        private readonly HttpClientHelper client;

        public Logical()
        {
        }
        public static string ConvertAmount(double amount)
        {
            var new_amount = $"{amount:N}";
            return new_amount;
        }

        public static async Task<Tuple<BookingResponseModel, ErrorModel>> PostBookingObjects(PostBookingObjv3 fullbookingobj)
        {
            using (HttpClientHelper client = new HttpClientHelper())
            {
                var bookobj = new BookingResponseModel();
                ErrorModel errorModel = null;

                await client.ProcessClientRequestAsync<BookingResponseModel>(GigUrl.CreatBookingRef, HttpMethod.Post, fullbookingobj,
                success =>
                {
                    bookobj = success;
                },
                    error =>
                    {
                        errorModel = error;
                    }
                );
                return new Tuple<BookingResponseModel, ErrorModel>(bookobj, errorModel);
            }
        }
        public static async Task<Tuple<Passenger, ErrorModel>> SignInWithMobileNumberOnly(SignUp UserDetail)
        {
            using (HttpClientHelper client = new HttpClientHelper())
            {
                var passengerObj = new Passenger();
                ErrorModel errorModel = null;

                await client.ProcessClientRequestAsync<Passenger>(GigUrl.SignInWithMobileNumber, HttpMethod.Post, UserDetail,
                success =>
                {
                    passengerObj = success;
                },
                    error =>
                    {
                        errorModel = error;
                    }
                );
                return new Tuple<Passenger, ErrorModel>(passengerObj, errorModel);
            }
        }
        public static async Task<PickupPointDetails> GetAllPickuproutes(string tripID)
        {
            using (HttpClientHelper client = new HttpClientHelper())
            {
                PickupPointDetails pickupPoints = new PickupPointDetails();
                ErrorModel errorModel = null;

                await client.ProcessClientRequestAsync<PickupPointDetails>(GigUrl.GigmsPickuppoints + tripID, HttpMethod.Get, "PickupPoints",
                success =>
                {
                    pickupPoints = success;
                },
                    error =>
                    {
                        errorModel = error;
                    }
                );
                return pickupPoints;
            }
        }
        public static async Task<Tuple<string, ErrorModel>> CreateOrderForUnifiedPayment(CreateOrderModel fullbookingobj)
        {
            using (HttpClientHelper client = new HttpClientHelper())
            {
                string bookobj = "";
                ErrorModel errorModel = null;

                await client.ProcessClientRequestAsync<string>(DevelopmentSettings.UnifiedPaymentCreateOrderUrl, HttpMethod.Post, fullbookingobj,
                success =>
                {
                    bookobj = success;
                },
                    error =>
                    {
                        errorModel = error;
                    }
                );
                return new Tuple<string, ErrorModel>(bookobj, errorModel);
            }
        }

        public static string GetHostingEnvironment()
        {
            return HttpContext.Current.Request.Url.Scheme + "://" + HttpContext.Current.Request.Url.Authority + HttpContext.Current.Request.ApplicationPath.Trim('/');
        }

        public static async Task<Tuple<BookingRefObject, ErrorModel>> PostInterswPayment(ProcessIntSwPayment intswtpaymentopt)
        {
            using (HttpClientHelper client = new HttpClientHelper())
            {
                BookingRefObject bookobj = new BookingRefObject();
                ErrorModel errorModel = null;
                await client.ProcessClientRequestAsync<BookingRefObject>(GigUrl.ProcessInterswitch, HttpMethod.Post, intswtpaymentopt,
                success =>
                {
                    bookobj = success;
                },
                    error =>
                    {
                        errorModel = error;
                    }
                );
                return new Tuple<BookingRefObject, ErrorModel>(bookobj, errorModel);
            }
        }

        public static async Task<Tuple<BookingRefObject, ErrorModel>> PostUnifiedPayment(ProcessUnifiedPayment Unifiedpaymentopt)
        {
            using (HttpClientHelper client = new HttpClientHelper())
            {
                BookingRefObject bookobj = new BookingRefObject();
                ErrorModel errorModel = null;
                await client.ProcessClientRequestAsync<BookingRefObject>(GigUrl.ProcessUnifiedPayment, HttpMethod.Post, Unifiedpaymentopt,
                success =>
                {
                    bookobj = success;
                },
                    error =>
                    {
                        errorModel = error;
                    }
                );
                return new Tuple<BookingRefObject, ErrorModel>(bookobj, errorModel);
            }
        }

        public static void WriteToLog(string str)
        {
            string Path = Convert.ToString(HostingEnvironment.MapPath((System.Configuration.ConfigurationManager.AppSettings["LogPath"])));

            System.IO.FileInfo file = new System.IO.FileInfo(Path + "GIGMVehicleHire" + DateTime.Now.ToString("yyyyMMMdd") + ".txt");
            using (System.IO.StreamWriter writer = file.AppendText())
            {
                writer.WriteLine(DateTime.Now.ToString("yyyy-MMM-dd-hh:mm:ss:fff"));
                writer.Write(str.Replace("\n", writer.NewLine));
                writer.WriteLine();
                writer.WriteLine();
                writer.Close();
            }
        }
        public static string TextReplace(Dictionary<string, string> map, string content)
        {
            string newstr = string.Empty;
            try
            {
                var regex = new Regex(String.Join("|", map.Keys));
                newstr = regex.Replace(content, m => map[m.Value]);
            }
            catch
            {

            }
            return newstr;
        }

        public static void MailSender(string EmailTo, string Subject, string Body, string bccMail, string ccMail = "")
        {
            //string smtpServerIP = Convert.ToString(System.Configuration.ConfigurationManager.AppSettings["EmailIP"]);
            var fromAddress = new MailAddress(Convert.ToString(System.Configuration.ConfigurationManager.AppSettings["EmailFromAddress"]));
            //using (System.Net.Mail.SmtpClient smtp = new System.Net.Mail.SmtpClient(smtpServerIP))
            using (System.Net.Mail.SmtpClient smtp = new System.Net.Mail.SmtpClient())
            {
                using (MailMessage usrMail = new MailMessage())
                {
                    usrMail.From = fromAddress;
                    usrMail.Body = Body;
                    usrMail.Subject = Subject;
                    usrMail.IsBodyHtml = true;
                    usrMail.To.Add(EmailTo);
                    if (!string.IsNullOrEmpty(ccMail))
                        usrMail.CC.Add(ccMail);
                    if (!string.IsNullOrEmpty(bccMail))
                        usrMail.Bcc.Add(bccMail);
                    smtp.Timeout = 20000;
                    try
                    {
                        smtp.Send(usrMail);
                    }
                    catch (Exception ex)
                    {

                    }
                }
            }
        }


        public static async Task<Tuple<SignUpResponseModel, ErrorModel>> SignIn(GigmsSignInModel UserDetail)
        {
            using (HttpClientHelper client = new HttpClientHelper())
            {
                var passengerObj = new SignUpResponseModel();
                ErrorModel errorModel = null;

                await client.ProcessClientRequestAsync<SignUpResponseModel>(GigUrl.GigmsSignIn, HttpMethod.Post, UserDetail,
                success =>
                {
                    passengerObj = success;
                },
                    error =>
                    {
                        errorModel = error;
                    }
                );
                return new Tuple<SignUpResponseModel, ErrorModel>(passengerObj, errorModel);
            }
        }

        public static async Task<Tuple<GigmsBookings, ErrorModel>> CustomerBookings(string mobile)
        {
            using (HttpClientHelper client = new HttpClientHelper())
            {
                var passengerObj = new GigmsBookings();
                ErrorModel errorModel = null;

                await client.ProcessClientRequestAsync<GigmsBookings>(GigUrl.GigmsCustomerBooking + mobile, HttpMethod.Get, mobile,
                success =>
                {
                    passengerObj = success;
                },
                    error =>
                    {
                        errorModel = error;
                    }
                );
                return new Tuple<GigmsBookings, ErrorModel>(passengerObj, errorModel);
            }
        }

        public static async Task<Tuple<SignUpResponseModel, ErrorModel>> Register(SignUpModel UserDetail)
        {
            using (HttpClientHelper client = new HttpClientHelper())
            {
                var passengerObj = new SignUpResponseModel();
                ErrorModel errorModel = null;

                await client.ProcessClientRequestAsync<SignUpResponseModel>(GigUrl.GigmsCreateUser, HttpMethod.Post, UserDetail,
                success =>
                {
                    passengerObj = success;
                },
                    error =>
                    {
                        errorModel = error;
                    }
                );
                return new Tuple<SignUpResponseModel, ErrorModel>(passengerObj, errorModel);
            }
        }


        public static async Task<Tuple<Passenger, ErrorModel>> UpdateProfile(UpdatePassenger UserDetail)
        {
            using (HttpClientHelper client = new HttpClientHelper())
            {
                var passengerObj = new Passenger();
                ErrorModel errorModel = null;

                await client.ProcessClientRequestAsync<Passenger>(GigUrl.UpdateUser, HttpMethod.Post, UserDetail,
                success =>
                {
                    passengerObj = success;
                },
                    error =>
                    {
                        errorModel = error;
                    }
                );
                return new Tuple<Passenger, ErrorModel>(passengerObj, errorModel);
            }
        }



        public static async Task<Tuple<SignUpResponseModel, ErrorModel>> Verify(GigmsVerifyCodeModel UserDetail)
        {
            using (HttpClientHelper client = new HttpClientHelper())
            {
                var passengerObj = new SignUpResponseModel();
                ErrorModel errorModel = null;

                await client.ProcessClientRequestAsync<SignUpResponseModel>(GigUrl.GigmsVerify, HttpMethod.Post, UserDetail,
                success =>
                {
                    passengerObj = success;
                },
                    error =>
                    {
                        errorModel = error;
                    }
                );
                return new Tuple<SignUpResponseModel, ErrorModel>(passengerObj, errorModel);
            }
        }

        public static async Task<Tuple<SignUpResponseModel, ErrorModel>> ForgotPassword(PasswordReset UserDetail)
        {
            using (HttpClientHelper client = new HttpClientHelper())
            {
                var passengerObj = new SignUpResponseModel();
                ErrorModel errorModel = null;

                await client.ProcessClientRequestAsync<SignUpResponseModel>(GigUrl.GigmsForgotPassword, HttpMethod.Post, UserDetail,
                success =>
                {
                    passengerObj = success;
                },
                    error =>
                    {
                        errorModel = error;
                    }
                );
                return new Tuple<SignUpResponseModel, ErrorModel>(passengerObj, errorModel);
            }
        }

        public static async Task<Tuple<ForgotPaswordActivationModel, ErrorModel>> GetActivationCode(PasswordActivationCode UserDetail)
        {
            using (HttpClientHelper client = new HttpClientHelper())
            {
                var passengerObj = new ForgotPaswordActivationModel();
                ErrorModel errorModel = null;

                await client.ProcessClientRequestAsync<ForgotPaswordActivationModel>(GigUrl.GetVericationCode, HttpMethod.Post, UserDetail,
                success =>
                {
                    passengerObj = success;
                },
                    error =>
                    {
                        errorModel = error;
                    }
                );
                return new Tuple<ForgotPaswordActivationModel, ErrorModel>(passengerObj, errorModel);
            }
        }


        public static async Task<Tuple<PostSearchResponseModel, ErrorModel>> PostPayStackPayment(ProcessPayStackPayment paystackpaymentopt)
        {
            using (HttpClientHelper client = new HttpClientHelper())
            {
                PostSearchResponseModel bookobj = new PostSearchResponseModel();
                ErrorModel errorModel = null;
                await client.ProcessClientRequestAsync<PostSearchResponseModel>(GigUrl.ProcessGigmsPayStack, HttpMethod.Post, paystackpaymentopt,
                success =>
                {
                    bookobj = success;

                    if (success.Code.Equals("200"))
                    {
                        HttpContext.Current.Session["Success"] = true;

                        HttpContext.Current.Session["booking"] = success;



                    }
                    else
                        HttpContext.Current.Session["Success"] = false;
                },
                    error =>
                    {
                        errorModel = error;
                        HttpContext.Current.Session["Success"] = false;
                    }
                );
                return new Tuple<PostSearchResponseModel, ErrorModel>(bookobj, errorModel);
            }
        }

        public static async Task<Tuple<PostSearchResponseModel, ErrorModel>> PostReschedulePayStackPayment(ProcessPayStackPayment paystackpaymentopt)
        {
            using (HttpClientHelper client = new HttpClientHelper())
            {
                PostSearchResponseModel bookobj = new PostSearchResponseModel();
                ErrorModel errorModel = null;
                await client.ProcessClientRequestAsync<PostSearchResponseModel>(GigUrl.ProcessPaystackPaymentForReschedule, HttpMethod.Post, paystackpaymentopt,
                success =>
                {
                    bookobj = success;
                },
                    error =>
                    {
                        errorModel = error;
                    }
                );
                return new Tuple<PostSearchResponseModel, ErrorModel>(bookobj, errorModel);
            }
        }



        public static async Task<TicketBookingDto> GetBookingRefDetailsForReschedule(TicketBookingRequest ticketBookingDto)
        {
            using (HttpClientHelper client = new HttpClientHelper())
            {
                TicketBookingDto bookingDetails = new TicketBookingDto();
                await client.ProcessClientRequestAsync<TicketBookingDto>(GigUrl.GetBookingRefDetailsForReschedule, HttpMethod.Post, ticketBookingDto,
                    success =>
                    {
                        if (success != null)
                        {
                            bookingDetails = success;
                        }
                        else
                        {

                        }

                    },
                        error =>
                        {
                            bookingDetails.Object = null;
                        }
                    );
                return bookingDetails;
            }
        }


        public static async Task<CreateRescheduleResponse> CreateRescheduleBuses(CreateRescheduleRequest ticketBookingDto)
        {
            using (HttpClientHelper client = new HttpClientHelper())
            {
                CreateRescheduleResponse bookingDetails = new CreateRescheduleResponse();
                await client.ProcessClientRequestAsync<CreateRescheduleResponse>(GigUrl.CreateRescheduleBuses, HttpMethod.Post, ticketBookingDto,
                    success =>
                    {
                        if (success != null)
                        {
                            bookingDetails = success;
                        }
                        else
                        {

                        }

                    },
                        error =>
                        {
                            bookingDetails.Object = false;
                        }
                    );
                return bookingDetails;
            }
        }


        public static async Task<Getavailabletrip> Getavailabletrip(CreateRescheduleRequest ticketBookingDto)
        {
            using (HttpClientHelper client = new HttpClientHelper())
            {
                Getavailabletrip bookingDetails = new Getavailabletrip();
                await client.ProcessClientRequestAsync<Getavailabletrip>(GigUrl.Getavailabletrip, HttpMethod.Post, ticketBookingDto,
                    success =>
                    {
                        if (success != null)
                        {
                            bookingDetails = success;
                        }
                        else
                        {

                        }

                    },
                        error =>
                        {
                            bookingDetails.Object = null;
                        }
                    );
                return bookingDetails;
            }
        }


        public static async Task<GetRemainingSeat> Getavailableseats(string vehicletripregistrationId)
        {
            using (HttpClientHelper client = new HttpClientHelper())
            {
                GetRemainingSeat bookingDetails = new GetRemainingSeat();
                await client.ProcessClientRequestAsync<GetRemainingSeat>(GigUrl.Getavailableseats + vehicletripregistrationId, HttpMethod.Get, vehicletripregistrationId,
                    success =>
                    {
                        if (success != null)
                        {
                            bookingDetails = success;
                        }
                        else
                        {

                        }

                    },
                        error =>
                        {
                            bookingDetails.Object = null;
                        }
                    );
                return bookingDetails;
            }
        }

        public static async Task<newRescheduleRefcode> Reschedulebooking(Getavailabletrip.Reschedule reschedule)
        {
            using (HttpClientHelper client = new HttpClientHelper())
            {
                newRescheduleRefcode newRefCode = new newRescheduleRefcode();
                await client.ProcessClientRequestAsync<newRescheduleRefcode>(GigUrl.Reschedulebooking, HttpMethod.Post, reschedule,
                    success =>
                    {
                        if (success != null)
                        {
                            newRefCode = success;
                        }
                        else
                        {

                        }

                    },
                        error =>
                        {
                            newRefCode = null;
                        }
                    );
                return newRefCode;
            }
        }


        public static async Task<Tuple<PostSearchResponseModel, ErrorModel>> ProcessPayStackWebhook(ProcessPayStackPayment paystackpaymentopt)
        {
            using (HttpClientHelper client = new HttpClientHelper())
            {
                PostSearchResponseModel bookobj = new PostSearchResponseModel();
                ErrorModel errorModel = null;
                await client.ProcessClientRequestAsync<PostSearchResponseModel>(GigUrl.GigmsProcessPayStackWebhook, HttpMethod.Post, paystackpaymentopt,
                success =>
                {
                    bookobj = success;
                },
                    error =>
                    {
                        errorModel = error;
                    }
                );
                return new Tuple<PostSearchResponseModel, ErrorModel>(bookobj, errorModel);
            }
        }




        public static async Task<Tuple<PostSearchResponseModel, ErrorModel>> PostFlutterWavePayment(ProcessFlutterWavePayment flutterwavepaymentopt)
        {
            using (HttpClientHelper client = new HttpClientHelper())
            {
                PostSearchResponseModel bookobj = new PostSearchResponseModel();
                ErrorModel errorModel = null;
                await client.ProcessClientRequestAsync<PostSearchResponseModel>(GigUrl.ProcessFlutterWavePayment, HttpMethod.Post, flutterwavepaymentopt,
                success =>
                {
                    bookobj = success;
                },
                    error =>
                    {
                        errorModel = error;
                    }
                );
                return new Tuple<PostSearchResponseModel, ErrorModel>(bookobj, errorModel);
            }
        }

        public static async Task<Tuple<PostSearchResponseModel, ErrorModel>> PostPaySwitchPayment(ProcessTheTellerPayment payswitchpayment)
        {
            using (HttpClientHelper client = new HttpClientHelper())
            {
                PostSearchResponseModel bookobj = new PostSearchResponseModel();
                ErrorModel errorModel = null;
                await client.ProcessClientRequestAsync<PostSearchResponseModel>(GigUrl.ProcessPaySwitchPayment, HttpMethod.Post, payswitchpayment,
                success =>
                {
                    bookobj = success;
                },
                    error =>
                    {
                        errorModel = error;
                    }
                );
                return new Tuple<PostSearchResponseModel, ErrorModel>(bookobj, errorModel);
            }
        }

        public static async Task<Tuple<PostSearchResponseModel, ErrorModel>> PostGlobalPay(ProcessGlobalPay globalPay)
        {
            using (HttpClientHelper client = new HttpClientHelper())
            {
                PostSearchResponseModel bookobj = new PostSearchResponseModel();
                ErrorModel errorModel = null;
                await client.ProcessClientRequestAsync<PostSearchResponseModel>(GigUrl.ProcessGlobalPay, HttpMethod.Post, globalPay,
                success =>
                {
                    bookobj = success;
                },
                    error =>
                    {
                        errorModel = error;
                    }
                );
                return new Tuple<PostSearchResponseModel, ErrorModel>(bookobj, errorModel);
            }
        }

        public static async Task<Tuple<PostSearchResponseModel, ErrorModel>> QuickTellerWebhook(QuickTellerResponseModel quickTellerPaymentopt)
        {
            using (HttpClientHelper client = new HttpClientHelper())
            {
                PostSearchResponseModel bookobj = new PostSearchResponseModel();
                ErrorModel errorModel = null;
                await client.ProcessClientRequestAsync<PostSearchResponseModel>(GigUrl.GigmsProcessQuickTellerPayment, HttpMethod.Post, quickTellerPaymentopt,
                success =>
                {
                    bookobj = success;
                },
                    error =>
                    {
                        errorModel = error;
                    }
                );
                return new Tuple<PostSearchResponseModel, ErrorModel>(bookobj, errorModel);
            }
        }

        public static async Task<List<PickUpTerminal>> GetPickUpTerminals(GetPickUpTerminals depertureTerminal)
        {
            using (HttpClientHelper client = new HttpClientHelper())
            {
                List<PickUpTerminal> pickUpObj = new List<PickUpTerminal>();
                // var pickUpObj = new PickUpTerminal();
                ErrorModel errorModel = null;

                await client.ProcessClientRequestAsync<List<PickUpTerminal>>(GigUrl.GetPickUpTerminals, HttpMethod.Post, depertureTerminal,
                success =>
                {


                    pickUpObj = success;
                },
                    error =>
                    {
                        errorModel = error;
                    }
                );
                return pickUpObj;
            }
        }

        public static async Task<Tuple<BookingRefObject, ErrorModel>> PostBankItPayment(ProcessBankItPayment bankItPaymentopt)
        {
            using (HttpClientHelper client = new HttpClientHelper())
            {
                BookingRefObject bookobj = new BookingRefObject();
                ErrorModel errorModel = null;
                await client.ProcessClientRequestAsync<BookingRefObject>(GigUrl.ProcessBankIt, HttpMethod.Post, bankItPaymentopt,
                success =>
                {
                    bookobj = success;
                },
                    error =>
                    {
                        errorModel = error;
                    }
                );
                return new Tuple<BookingRefObject, ErrorModel>(bookobj, errorModel);
            }
        }

        public static async Task<DepartureTerminals> GetDepartureTerminalsBycountrycode(string countrycode)
        {
            using (HttpClientHelper client = new HttpClientHelper())
            {
                DepartureTerminals departureTerminals = new DepartureTerminals();
                // var pickUpObj = new PickUpTerminal();
                ErrorModel errorModel = null;

                await client.ProcessClientRequestAsync<DepartureTerminals>(GigUrl.GetDepartureTerminalsByCountryCode + countrycode, HttpMethod.Get, "depertureTerminal",
                success =>
                {


                    departureTerminals = success;
                },
                    error =>
                    {
                        errorModel = error;
                    }
                );
                return departureTerminals;
            }
        }


        public static async Task<TravelDocuments> GetTravelDocuments()
        {
            using (HttpClientHelper client = new HttpClientHelper())
            {
                TravelDocuments travelDocuments = new TravelDocuments();
                ErrorModel errorModel = null;
                await client.ProcessClientRequestAsync<TravelDocuments>(GigUrl.GetTravelDocumentUrl, HttpMethod.Get, "traveldocument",
                success =>
                {


                    travelDocuments = success;
                },
                    error =>
                    {
                        errorModel = error;
                    }
                );
                return travelDocuments;
            }
        }

        public static async Task<DepartureTerminals> GetDepartureTerminals()
        {
            using (HttpClientHelper client = new HttpClientHelper())
            {
                DepartureTerminals departureTerminals = new DepartureTerminals();
                // var pickUpObj = new PickUpTerminal();
                ErrorModel errorModel = null;

                await client.ProcessClientRequestAsync<DepartureTerminals>(GigUrl.GetDepartureTerminalUrl, HttpMethod.Get, "depertureTerminal",
                success =>
                {


                    departureTerminals = success;
                },
                    error =>
                    {
                        errorModel = error;
                    }
                );
                return departureTerminals;
            }
        }


        public static async Task<DestinationTerminals> GetDestinationTerminals(int departureTerminalId)
        {
            using (HttpClientHelper client = new HttpClientHelper())
            {
                DestinationTerminals destinationTerminals = new DestinationTerminals();
                // var pickUpObj = new PickUpTerminal();
                ErrorModel errorModel = null;

                await client.ProcessClientRequestAsync<DestinationTerminals>(GigUrl.GetDestinationTerminalUrl + departureTerminalId, HttpMethod.Get, "depertureTerminal",
                success =>
                {


                    destinationTerminals = success;
                },
                    error =>
                    {
                        errorModel = error;
                    }
                );
                return destinationTerminals;
            }
        }

        /*  public static async Task<DepartureTerminals> GetTerminals()
          {
              using (HttpClientHelper client = new HttpClientHelper())
              {

              }
          }*/

        public static async Task<GetAcessTokenResponseModel> GetGigmsToken()
        {
            var client = new RestClient(System.Configuration.ConfigurationManager.AppSettings["GIGMSToken"]);
            var request = new RestRequest(Method.POST);
            request.AddHeader("content-type", "application/x-www-form-urlencoded");
            request.AddHeader("postman-token", "1cbc9824-695b-afd2-d057-b7fd2965f6d4");
            request.AddHeader("cache-control", "no-cache");
            request.AddParameter("application/x-www-form-urlencoded", "client_id=X-GIG-ADMIN&client_secret=X-GIG-Secret&grant_type=password&username=admin%40thegiggroupng.com&password=password", ParameterType.RequestBody);
            IRestResponse response = client.Execute(request);
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            GetAcessTokenResponseModel accessTokenResponse = serializer.Deserialize<GetAcessTokenResponseModel>(response.Content);

            //GetAcessTokenModel accessTokenModel = new GetAcessTokenModel
            //{
            //    client_id = ConfigurationManager.AppSettings["gigms_client_id"],
            //    client_secret= ConfigurationManager.AppSettings["gigms_client_secret"],
            //    grant_type= ConfigurationManager.AppSettings["gigms_grant_type"],
            //    username= ConfigurationManager.AppSettings["gigms_username"],
            //    password = ConfigurationManager.AppSettings["gigms_password"]
            //};

            return accessTokenResponse;

        }

        public static async Task<Tuple<PostSearchResponseModel, ErrorModel>> PostSearchObjects(PostSearchModel fullbookingobj)
        {
            using (HttpClientHelper client = new HttpClientHelper())
            {
                var bookobj = new PostSearchResponseModel();
                ErrorModel errorModel = null;

                await client.ProcessClientRequestAsync<PostSearchResponseModel>(GigUrl.PostBookingDetails, HttpMethod.Post, fullbookingobj,
                success =>
                {
                    bookobj = success;
                },
                    error =>
                    {
                        errorModel = error;
                    }
                );
                return new Tuple<PostSearchResponseModel, ErrorModel>(bookobj, errorModel);
            }
        }

        //hire service
        public static async Task<getVehicleForHireResponse> GetBusesForHire(GetHireVehicleRequest hireRequest)
        {
            using (HttpClientHelper client = new HttpClientHelper())
            {
                getVehicleForHireResponse hireDetails = new getVehicleForHireResponse();
                await client.ProcessClientRequestAsync<getVehicleForHireResponse>(GigUrl.GetHireBuses, HttpMethod.Post, hireRequest,
                    success =>
                    {
                        if (success != null)
                        {
                            hireDetails = success;
                        }
                        else
                        {

                        }

                    },
                        error =>
                        {
                            hireDetails.Object = null;
                        }
                    );
                return hireDetails;
            }
        }

        public static async Task<mapRootObject> GetDepartCord(string urlDepart)
        {

            using (HttpClientHelper client = new HttpClientHelper())
            {
                mapRootObject hireDetails = new mapRootObject();
                await client.ProcessClientRequestAsync<mapRootObject>(urlDepart, HttpMethod.Get, "hireRequest",
                    success =>
                    {
                        if (success != null)
                        {
                            hireDetails = success;
                        }
                        else
                        {

                        }

                    },
                        error =>
                        {
                            hireDetails = null;
                        }
                    );
                return hireDetails;
            }

        }

        public static async Task<mapRootObject> GetArriveCord(string urlArrival)
        {

            using (HttpClientHelper client = new HttpClientHelper())
            {
                mapRootObject hireDetails = new mapRootObject();
                await client.ProcessClientRequestAsync<mapRootObject>(urlArrival, HttpMethod.Get, "hireRequest",
                    success =>
                    {
                        if (success != null)
                        {
                            hireDetails = success;
                        }
                        else
                        {

                        }

                    },
                        error =>
                        {
                            hireDetails = null;
                        }
                    );
                return hireDetails;
            }

        }

        public static async Task<GoogleRootObject> GetDistance(string url)
        {

            using (HttpClientHelper client = new HttpClientHelper())
            {
                GoogleRootObject hireDetails = new GoogleRootObject();
                await client.ProcessClientRequestAsync<GoogleRootObject>(url, HttpMethod.Get, "hireRequest",
                    success =>
                    {
                        if (success != null)
                        {
                            hireDetails = success;
                        }
                        else
                        {

                        }

                    },
                        error =>
                        {
                            hireDetails = null;
                        }
                    );
                return hireDetails;
            }

        }

        public static async Task<getVehicleForHireResponse> GetBusesForHireReturn(GetHireVehicleRequestReturn hireRequest)
        {
            using (HttpClientHelper client = new HttpClientHelper())
            {
                getVehicleForHireResponse hireDetails = new getVehicleForHireResponse();
                await client.ProcessClientRequestAsync<getVehicleForHireResponse>(GigUrl.GetHireBuses, HttpMethod.Post, hireRequest,
                    success =>
                    {
                        if (success != null)
                        {
                            hireDetails = success;
                        }
                        else
                        {

                        }

                    },
                        error =>
                        {
                            hireDetails.Object = null;
                        }
                    );
                return hireDetails;
            }
        }



        public static async Task<Tuple<PostHireResponseModel, ErrorModel>> PostHirePayStackPayment(ProcessPayStackPayment paystackpaymentopt)
        {
            using (HttpClientHelper client = new HttpClientHelper())
            {
                PostHireResponseModel bookobj = new PostHireResponseModel();
                ErrorModel errorModel = null;
                await client.ProcessClientRequestAsync<PostHireResponseModel>(GigUrl.ProcessHirePaystack + paystackpaymentopt.RefCode, HttpMethod.Get, paystackpaymentopt,
                success =>
                {
                    bookobj = success;
                },
                    error =>
                    {
                        errorModel = error;
                    }
                );
                return new Tuple<PostHireResponseModel, ErrorModel>(bookobj, errorModel);
            }
        }
        public static async Task<Tuple<getHireRefcodeResponse, ErrorModel>> GetHireRefcode(GetHireRefcodeRequest getHireRefcodeRequest)
        {
            using (HttpClientHelper client = new HttpClientHelper())
            {
                getHireRefcodeResponse hireDetails = new getHireRefcodeResponse();
                ErrorModel errorModel = null;

                await client.ProcessClientRequestAsync<getHireRefcodeResponse>(GigUrl.GetHireRefcodeBuses, HttpMethod.Post, getHireRefcodeRequest,
                    success =>
                    {
                        if (success != null)
                        {
                            hireDetails = success;
                        }
                        else
                        {

                        }

                    },
                        error =>
                        {
                            errorModel = error;
                        }
                    );
                return new Tuple<getHireRefcodeResponse, ErrorModel>(hireDetails, errorModel);

            }
        }

        public static async Task<Tuple<getHireRefcodeResponse, ErrorModel>> GetHireRefcodeReturn(GetHireRefcodeRequestReturn getHireRefcodeRequest)
        {
            using (HttpClientHelper client = new HttpClientHelper())
            {
                getHireRefcodeResponse hireDetails = new getHireRefcodeResponse();
                ErrorModel errorModel = null;

                await client.ProcessClientRequestAsync<getHireRefcodeResponse>(GigUrl.GetHireRefcodeBuses, HttpMethod.Post, getHireRefcodeRequest,
                    success =>
                    {
                        if (success != null)
                        {
                            hireDetails = success;
                        }
                        else
                        {

                        }

                    },
                        error =>
                        {
                            errorModel = error;
                        }
                    );
                return new Tuple<getHireRefcodeResponse, ErrorModel>(hireDetails, errorModel);

            }
        }

        public static async Task<Tuple<DepartureTerminals, ErrorModel>> GetTerminals()
        {
            var terminals = new DepartureTerminals();
            var errModel = new ErrorModel();
            using (HttpClientHelper client = new HttpClientHelper())
            {
                await client.ProcessClientRequestAsync<DepartureTerminals>(GigUrl.GetTerminals, HttpMethod.Get, null, success =>
                {

                    terminals = success;
                }, error =>
                {
                    errModel = error;

                });
            }
            return new Tuple<DepartureTerminals, ErrorModel>(terminals, errModel);
        }
        public static async Task<Tuple<TravelSchedule, ErrorModel>> GetScheduleForTerminal(int terminalId)
        {
            var terminals = new TravelSchedule();
            var errModel = new ErrorModel();
            using (HttpClientHelper client = new HttpClientHelper())
            {
                await client.ProcessClientRequestAsync<TravelSchedule>(GigUrl.GetSchedule + terminalId, HttpMethod.Get, null, success =>
                {
                    terminals = success;
                }, error =>
                {
                    errModel = error;

                });
            }
            return new Tuple<TravelSchedule, ErrorModel>(terminals, errModel);
        }

        public static async Task<Tuple<Trip, ErrorModel>> GetTripByRoute(int routeId)
        {
            var trips = new Trip();
            var errModel = new ErrorModel();
            using (HttpClientHelper client = new HttpClientHelper())
            {
                await client.ProcessClientRequestAsync<Trip>(GigUrl.GetTripByRoute + routeId, HttpMethod.Get, null, success =>
                {
                    trips = success;
                }, error =>
                {
                    errModel = error;

                });
            }
            return new Tuple<Trip, ErrorModel>(trips, errModel);
        }

        public static async Task<Tuple<CountryResponse, ErrorModel>> getCountryDetailsByCountryCode(String countryCode)
        {
            var countryResponse = new CountryResponse();
            var errorObj = new ErrorModel();

            using (HttpClientHelper client = new HttpClientHelper())
            {
                await client.ProcessClientRequestAsync<CountryResponse>(GigUrl.GigmsGetCountryDetails + countryCode, HttpMethod.Get, null,
                    success =>
                    {
                        if (success != null)
                        {
                            countryResponse = success;
                        }
                    }, error =>
                    {
                        errorObj = error;
                    });
            }

            return new Tuple<CountryResponse, ErrorModel>(countryResponse, errorObj);
        }

        public static async Task<Tuple<BookingDetails, ErrorModel>> GetBookingDetailsByRef(String refcode)
        {
            var bookingDetails = new BookingDetails();
            var errorObj = new ErrorModel();

            using (HttpClientHelper client = new HttpClientHelper())
            {
                await client.ProcessClientRequestAsync<BookingDetails>(GigUrl.GigmsGetBookingRef + refcode, HttpMethod.Get, null,
                    success =>
                    {
                        if (success != null)
                        {
                            bookingDetails = success;
                        }
                    }, error =>
                    {
                        bookingDetails.Object.BookingReferenceCode = String.Empty;
                        errorObj = error;
                    });
            }

            return new Tuple<BookingDetails, ErrorModel>(bookingDetails, errorObj);
        }

        public static async Task<Tuple<SavePartnerResponse, ErrorModel>> SaveParnerEnquiry(PartnerEnquiryDto enquiry)
        {
            if (string.IsNullOrEmpty(enquiry.CompanyName))
            {
                enquiry.CompanyName = "Null";
            }
            enquiry.VehicleSpec = "Null";
            using (HttpClientHelper client = new HttpClientHelper())
            {
                var response = new SavePartnerResponse();
                ErrorModel errorModel = null;

                await client.ProcessClientRequestAsync<SavePartnerResponse>(GigUrl.SavePartnerEnquiry, HttpMethod.Post, enquiry,
                    success =>
                    {
                        if (success != null)
                        {
                            response = success;
                        }
                        else
                        {

                        }

                    },
                        error =>
                        {
                            errorModel = error;
                        }
                    );
                return new Tuple<SavePartnerResponse, ErrorModel>(response, errorModel);

            }



            //hire service ends



        }





    }

    public class OperationalResult
    {
        public string VehicleName { get; set; }
        public string Pickupdate { get; set; }
        public string dropoffdate { get; set; }
        public string pickupTime { get; set; }
        public string dropoffTime { get; set; }
        public string noOfvehi { get; set; }
        public string DepartureState { get; set; }
        public string ArriSatte { get; set; }
        public string pickuptown { get; set; }
        public string dropofftown { get; set; }
        public string selectedFrom { get; set; }
        public string selectedTo { get; set; }
        public string Distance { get; set; }
        public string NoofDays { get; set; }
    }





}
