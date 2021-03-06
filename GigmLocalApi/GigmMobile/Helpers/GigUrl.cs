﻿namespace GIGMWEB.Models
{
    public class GigUrl
    {
        static string BaseUrl => DevelopmentSettings.WebServiceBaseUrl;

        //GIGMS Starts
        public static string GetDepartureTerminalUrl = BaseUrl + "api/terminals";
        public static string GetDestinationTerminalUrl = BaseUrl + "api/routes/terminals/destinations/";
        public static string GetVehicleforDay = BaseUrl + "api/bookings/search";
        public static string GetGigmsAcessToken = BaseUrl + "login";
        public static string PostBookingDetails = BaseUrl + "api/bookings/postsearch";
        public static string ProcessGigmsPayStack = BaseUrl + "api/bookings/ProcessPaystackPayment/";
        public static string GigmsGetBookingRef = BaseUrl + "api/bookings/details/";
        public static string GigmsCreateUser = BaseUrl + "api/customers/CreatePassenger/";
        public static string GigmsVerify = BaseUrl + "/api/customers/VerifyCode/";
        public static string GigmsSignIn = BaseUrl + "/api/customers/GetPassengerProfile/";
        public static string GetVericationCode = BaseUrl + "/api/customers/ForgotPasswordVerificationCode/";
        public static string GigmsForgotPassword = BaseUrl + "/api/customers/ForgotPassword/";
        public static string GigmsCustomerBooking = BaseUrl + "/api/bookings/history/";
        public static string GigmsProcessPayStackWebhook = BaseUrl + "api/bookings/ProcessPayStackWebhook/";
        public static string GigmsProcessQuickTellerPayment = BaseUrl + "api/bookings/ProcessQuickTellerPayment/";

        public static string GetBookingRefDetailsForReschedule = BaseUrl + "api/bookings/ticketbookingsearch/";
        public static string CreateRescheduleBuses = BaseUrl + "api/bookings/createRescheduleBuses/";
        public static string Getavailabletrip = BaseUrl + "api/bookings/getavailabletrip ";
        public static string Getavailableseats = BaseUrl + "api/bookings/getavailableseats/";
        public static string ProcessPaystackPaymentForReschedule = BaseUrl + "api/bookings/ProcessPaystackPaymentForReschedule";
        public static string Reschedulebooking = BaseUrl + "api/bookings/reschedulebooking";
        public static string ProcessFlutterWavePayment = BaseUrl + "api/bookings/ProcessFlutterWavePayment/";
        public static string ProcessGlobalPay = BaseUrl + "api/bookings/ProcessGlobalPay/";
        public static string GetHireBuses = BaseUrl + "/api/hiredServiceBookings/hireservicebookingsearch";
        public static string GetHireRefcodeBuses = BaseUrl + "/api/hiredServiceBookings/hireservicebookingsearchpost";
        public static string ProcessHirePaystack = BaseUrl + "/api/hiredServiceBookings/processHireServicePaystackPayment/";
        //GIGMS 

        public static string GetBookingStatesUrl = BaseUrl + "BookingSearcher/GetStates";
        public static string GetBookingTerminal = BaseUrl + "BookingSearcher/GetTerminalsForState/";
        public static string GetRoutesTerminal = BaseUrl + "BookingSearcher/GetRoutesForTerminal/";
        public static string GetBusforDay = BaseUrl + "BookingSearcher/SearchBusForDay/";
        public static string GetBookingRoute = BaseUrl + "BookingSearcher/GetRoutesForTerminal/";
        public static string GetBookingRef = BaseUrl + "Booking/GetBookingStatus?refCode=";
        public static string PostSearchBusForDay = BaseUrl + "BookingSearcher/SearchBusForDay/";
        public static string CreatBookingRef = BaseUrl + "BookingSearcher/CreateBookingRef";
        public static string ProcessInterswitch = BaseUrl + "/PaymentProcessor/ProcessInterswitchPayment/";
        public static string ProcessFlutterWave = BaseUrl + "PaymentProcessor/ProcessFlutterWavePayment/";
        public static string ProcessUnifiedPayment = BaseUrl + "/PaymentProcessor/ProcessUnifiedPayment/";
        public static string GigmsPickuppoints = BaseUrl + "api/pickup/points/tripPickupPoints/";



        //We added these fields to take care of signing in
        public static string CreateUser = BaseUrl + "Passenger/CreatePassenger/";
        public static string UpdateUser = BaseUrl + "Passenger/UpdatePassenger/";
        public static string SignIn = BaseUrl + "Passenger/GetPassengerProfile/";
        public static string SignInWithMobileNumber = BaseUrl + "Passenger/GetPassengerProfileWithPhoneNumber/";
        public static string CustomerBooking = BaseUrl + "Passenger/PassengerBookings/";
        public static string Verify = BaseUrl + "Passenger/VerifyCode/";
        public static string ForgotPassword = BaseUrl + "Passenger/ForgotPassword/";

        //to process paystack
        public static string ProcessPayStack = BaseUrl + "/PaymentProcessor/ProcessPayStackPayment/";
        public static string ProcessPayStackWebhook = BaseUrl + "/PaymentProcessor/ProcessPayStackWebhook/";

        //to process BankIt
        public static string ProcessBankIt = BaseUrl + "/PaymentProcessor/ProcessBankItPayment/";

        //get pickup
        public static string GetPickUpTerminals = BaseUrl + "BookingSearcher/GetPickUpTerminals/";
        public static string GetTerminals = BaseUrl + "api/terminals";
        public static string GetSchedule = BaseUrl + "api/routes/terminals/routes/";
        public static string GetTripByRoute = BaseUrl + "api/trips/trips/";

        //Partner Enquiry
        public static string SavePartnerEnquiry = BaseUrl + "/api/partnerEnquiry/add";
        public static string listPartnerEnquiries = BaseUrl + "/api/partnerEnquiry/list";
    }

}

