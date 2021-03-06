﻿using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Xml.Serialization;
using static GIGMWEB.Models.PostSearchResponseModel;

namespace GIGMWEB.Models
{
    public class GetStatesModels
    {
        [JsonProperty(PropertyName = "id")]
        public int Id { get; set; }

        [JsonProperty(PropertyName = "state")]
        public string State { get; set; }
    }
    public class GetTerminals
    {
        [JsonProperty(PropertyName = "id")]
        public string ID { get; set; }

        [JsonProperty(PropertyName = "DisplayName")]
        public string Terminal { get; set; }
    }

    public class GetBusModel
    {
        public string RouteId { get; set; }
        public string travelDate { get; set; }
        public int NoOfTickets { get; set; }
    }






    public class Beneficiaries
    {
        public string name { get; set; }
        public string sex { get; set; }
        public string seatNumber { get; set; }
        public string departureDate { get; set; }
        public string refCode { get; set; }
        public string vehicleDetails { get; set; }
        public bool checkIn { get; set; }
    }

    //public class FinalBookingStatus
    //{
    //    public string id { get; set; }
    //    public string bookingStatus { get; set; }
    //    public string route { get; set; }
    //    public double unitAmount { get; set; }
    //    public double totalBookingCost { get; set; }
    //    public int noOfTicket { get; set; }
    //    public string bookingDate { get; set; }
    //    public string responseDesc { get; set; }
    //    public string paymentReference { get; set; }
    //    public bool checkIn { get; set; }
    //    public Booker booker { get; set; }
    //    public List<Beneficiary> beneficiaries { get; set; }
    //}





    public class OnlineVehicle
    {
        public double fare { get; set; }
        public double discountInPercent { get; set; }
        public string busType { get; set; }
        public string busRouteId { get; set; }
        public int seatCapacity { get; set; }
        public string id { get; set; }
        public string route { get; set; }
        public string travelDate { get; set; }
        public string departureTime { get; set; }
        public string description { get; set; }
        public string SeatUnbooked { get; set; }
        public string DiscountedFare { get; set; }
        public int bookingType { get; set; }
        public double DiscountedFareForMinor { get; set; }
        public double DiscountInPercentForMinor { get; set; }

        public decimal PromoFiveFare { get; set; }
        public double PromoFiveInPercent { get; set; }
        public decimal PromoFiftyFare { get; set; }
        public double PromoFiftyInPercent { get; set; }

        public double MemberPromoFare { get; set; }
        public double MemberPromoInPercent { get; set; }

        public double TerminalPromoFare { get; set; }
        public double TerminalPromoInPercent { get; set; }

        public double TerminalGuestPromoFare { get; set; }
        public double TerminalGuestPromoInPercent { get; set; }




        public string DisplaySeatUnbooked
        {
            get
            {
                var result = "";
                if (SeatUnbooked == "0")
                {
                    result = "Seats Fully Booked";
                }
                else
                {
                    result = $"{SeatUnbooked} seat(s) available";
                }
                return result;
            }
        }

    }


    public class ProcessUnifiedPayment
    {
        public string OrderId { get; set; }
        public string OrderDesc { get; set; }
        public string TransactionId { get; set; }
        public string TransactionType { get; set; }
        public string TransactionDate { get; set; }
        public string CardHolder { get; set; }
        public string Pan { get; set; }
        public decimal Amount { get; set; }
        public decimal AcquirerFee { get; set; }
        public string Currency { get; set; }
        public string ResponseCode { get; set; }
        public string ResponseDesc { get; set; }
        public string ApprovalCode { get; set; }
        public string Brand { get; set; }
        public string OrderStatus { get; set; }
        public string ThreeDSVerificaion { get; set; }
        public string ThreeDSStatus { get; set; }
        public string RawGatewayXml { get; set; }
    }




    public class FullBookingItem1
    {
        public string id { get; set; }
        public string refCode { get; set; }
        public string bookingStatus { get; set; }
        public bool checkedIn { get; set; }
        public string busPassengerMobile { get; set; }
        public double amount { get; set; }
        public string route { get; set; }
        public int noOfSeat { get; set; }
        public string departureDate { get; set; }
        public string bookingDate { get; set; }
        public string responseDesc { get; set; }
        public string paymentReference { get; set; }
    }

    public class FullBookingBooker
    {
        public string mobile { get; set; }
        public string name { get; set; }
        public string sex { get; set; }
        public string seatNumber { get; set; }
        public string departureDate { get; set; }
        public string refCode { get; set; }
        public string vehicleDetails { get; set; }
        public bool checkIn { get; set; }
    }

    public class FullBookingBeneficiary
    {
        public string name { get; set; }
        public string sex { get; set; }
        public string seatNumber { get; set; }
        public string departureDate { get; set; }
        public string refCode { get; set; }
        public string vehicleDetails { get; set; }
        public bool checkIn { get; set; }
    }

    //public class FullBookingItem2
    //{
    //    public string id { get; set; }
    //    public string bookingStatus { get; set; }
    //    public string route { get; set; }
    //    public double unitAmount { get; set; }
    //    public double totalBookingCost { get; set; }
    //    public int noOfTicket { get; set; }
    //    public string bookingDate { get; set; }
    //    public string responseDesc { get; set; }
    //    public string paymentReference { get; set; }
    //    public bool checkIn { get; set; }
    //    public Booker booker { get; set; }
    //    public List<Beneficiary> beneficiaries { get; set; }
    //}

    public class BookingResponseModel
    {
        [JsonProperty(PropertyName = "id")]
        public string Id { get; set; }

        [JsonProperty(PropertyName = "refCode")]
        public string RefCode { get; set; }

        [JsonProperty(PropertyName = "BookingStatus")]
        public string BookingStatus { get; set; }

        [JsonProperty(PropertyName = "checkedIn")]
        public bool CheckedIn { get; set; }

        [JsonProperty(PropertyName = "BusPassengerMobile")]
        public string busPassengerMobile { get; set; }

        [JsonProperty(PropertyName = "amount")]
        public double Amount { get; set; }

        [JsonProperty(PropertyName = "route")]
        public string Route { get; set; }

        [JsonProperty(PropertyName = "noOfSeat")]
        public int NoOfSeat { get; set; }

        [JsonProperty(PropertyName = "departureDate")]
        public string DepartureDate { get; set; }

        [JsonProperty(PropertyName = "bookingDate")]
        public string BookingDate { get; set; }

        [JsonProperty(PropertyName = "responseDesc")]
        public string ResponseDesc { get; set; }

        [JsonProperty(PropertyName = "paymentReference")]
        public string PaymentReference { get; set; }
    }

    public class VehicleResult
    {
        [JsonProperty(PropertyName = "availableSeat")]
        public List<string> availableSeat { get; set; }

        [JsonProperty(PropertyName = "onlineVehicle")]
        public OnlineVehicle onlineVehicle { get; set; }
    }

    [JsonObject(MemberSerialization.OptIn)]
    public class GetBusfortheDay
    {
        [JsonProperty(PropertyName = "id")]
        public string Id { get; set; }

        [JsonProperty(PropertyName = "availableSeat")]
        public string availSeats { get; set; }

        [JsonProperty(PropertyName = "discountInPercent")]
        public string percenDiscnt { get; set; }

        [JsonProperty(PropertyName = "fare")]
        public string fare { get; set; }

        [JsonProperty(PropertyName = "busType")]
        public string busType { get; set; }

        [JsonProperty(PropertyName = "busRouteId")]
        public string busRtId { get; set; }

        [JsonProperty(PropertyName = "seatCapacity")]
        public string seatCapacity { get; set; }

        [JsonProperty(PropertyName = "route")]
        public string route { get; set; }

        [JsonProperty(PropertyName = "travelDate")]
        public string trDate { get; set; }

        [JsonProperty(PropertyName = "departureTime")]
        public string deptTime { get; set; }

        [JsonProperty(PropertyName = "description")]
        public string Desc { get; set; }


    }

    public class GetArrTerminals
    {
        [JsonProperty(PropertyName = "id")]
        public string ID { get; set; }

        [JsonProperty(PropertyName = "DestinationTerminalName")]
        public string DestTerminal { get; set; }
    }

    public class BookingBeneficiary
    {
        public string name { get; set; }
        public int sex { get; set; }
        public string phone { get; set; }
        public string nextOfKin { get; set; }
        public string nextOfKinMobile { get; set; }
        public int seatNumber { get; set; }
        public string onlineVehicleId { get; set; }
        public Boolean IsMinor { get; set; }
    }

    public class Beneficiary
    {
        public string name { get; set; }
        public string sex { get; set; }
        public string seatNumber { get; set; }
        public string departureDate { get; set; }
        public string refCode { get; set; }
        public string vehicleDetails { get; set; }
        public bool checkIn { get; set; }
    }




    public class PostBookingObjv3
    {
        public int bookingType { get; set; }
        public string name { get; set; }
        public string email { get; set; }
        public string nextOfKin { get; set; }
        public string nextOfKinMobile { get; set; }
        public int sex { get; set; }
        public string busRouteId { get; set; }
        public string busPassengerMobile { get; set; }
        public int seatNumber { get; set; }
        public string onlineVehicleId { get; set; }
        public string bookingDate { get; set; }
        public List<BookingBeneficiary> beneficiaries { get; set; }
        public string repEmail { get; set; }
        public bool isonhold { get; set; }
        public int isPromo { get; set; }

        public int? PaymentGatewayType { get; set; }

        public string SelectedSeats { get; set; }

        public bool PickUp { get; set; }
        public string PickUpLocation { get; set; }
        public string PickUpTime { get; set; }
    }

    public class PostBookingObj
    {
        public string name { get; set; }
        public string email { get; set; }
        public string nextOfKin { get; set; }
        public string nextOfKinMobile { get; set; }
        public int sex { get; set; }
        public string busRouteId { get; set; }
        public string busPassengerMobile { get; set; }
        public int seatNumber { get; set; }
        public string onlineVehicleId { get; set; }
        public string bookingDate { get; set; }
        public List<BookingBeneficiary> beneficiaries { get; set; }
        public string repEmail { get; set; }

    }



    //public class BookerDetails
    //{
    //    public string mobile { get; set; }
    //    public string name { get; set; }
    //    public string sex { get; set; }
    //    public string seatNumber { get; set; }
    //    public string departureDate { get; set; }
    //    public string refCode { get; set; }
    //    public string vehicleDetails { get; set; }
    //    public bool checkIn { get; set; }
    //}

    public class RefBooker
    {
        public string mobile { get; set; }
        public string name { get; set; }
        public string sex { get; set; }
        public string seatNumber { get; set; }
        public string departureDate { get; set; }
        public string refCode { get; set; }
        public string vehicleDetails { get; set; }
        public bool checkIn { get; set; }
    }

    public class RefBeneficiary
    {
        public string name { get; set; }
        public string sex { get; set; }
        public string seatNumber { get; set; }
        public string departureDate { get; set; }
        public string refCode { get; set; }
        public string vehicleDetails { get; set; }
        public bool checkIn { get; set; }
    }

    [JsonObject(MemberSerialization.OptIn)]
    public class BookingRefObject
    {
        [JsonProperty(PropertyName = "id")]
        public string Id { get; set; }

        [JsonProperty(PropertyName = "bookingStatus")]
        public string BookingStatus { get; set; }

        [JsonProperty(PropertyName = "route")]
        public string Route { get; set; }

        [JsonProperty(PropertyName = "unitAmount")]
        public double UnitAmount { get; set; }

        [JsonProperty(PropertyName = "totalBookingCost")]
        public double TotalBookingCost { get; set; }

        [JsonProperty(PropertyName = "noOfTicket")]
        public int NoOfTicket { get; set; }

        [JsonProperty(PropertyName = "bookingDate")]
        public string BookingDate { get; set; }

        [JsonProperty(PropertyName = "responseDesc")]
        public string ResponseDesc { get; set; }

        [JsonProperty(PropertyName = "paymentReference")]
        public string PaymentReference { get; set; }

        [JsonProperty(PropertyName = "PickUp")]
        public bool PickUp { get; set; }

        [JsonProperty(PropertyName = "PickUpLocation")]
        public string PickUpLocation { get; set; }

        [JsonProperty(PropertyName = "PickUpTime")]
        public string PickUpTime { get; set; }


        [JsonProperty(PropertyName = "checkIn")]
        public bool CheckIn { get; set; }

        [JsonProperty(PropertyName = "Booker")]
        public RefBooker Booker { get; set; }

        [JsonProperty(PropertyName = "Beneficiaries")]
        public List<RefBeneficiary> beneficiaries { get; set; }


    }

    public class Booker
    {
        public string mobile { get; set; }
        public string name { get; set; }
        public string sex { get; set; }
        public string seatNumber { get; set; }
        public string departureDate { get; set; }
        public string refCode { get; set; }
        public string vehicleDetails { get; set; }
        public bool checkIn { get; set; }
    }
    public class ProcessIntSwPayment
    {
        public string refCode { get; set; }
        public string paymentReference { get; set; }
        public string retrievalReferenceNumber { get; set; }
        public string cardNumber { get; set; }
        public string approvedAmount { get; set; }
        public string gatewayDesc { get; set; }


    }

    public class ProcessBankItPayment
    {
        public string TransactionRef { get; set; }
        public string FinalChecksum { get; set; }
        public string Success { get; set; }
        public string TransactionId { get; set; }
        public int Amount { get; set; }
        public string Checksum { get; set; }
        public string Description { get; set; }
        public string TerminalId { get; set; }
        public string ResponseUrl { get; set; }
    }

    public class Passenger
    {
        // [Required]
        public string Mobile { get; set; }

        // [Required]
        public string Name { get; set; }

        //[Required]
        // [EmailAddress(ErrorMessage = "Invalid Email")]
        public string Email { get; set; }
        public DateTime? DoB { get; set; }

        //[Required]
        public string NextOfKin { get; set; }
        public string NextOfKinMobile { get; set; }

        public int? Sex { get; set; }

        //sign in and sign up

        public string Mobile2 { get; set; }
        public string VerificationCode { get; set; }
        public bool ActivationStatus { get; set; }

        public string Password { get; set; }

        public virtual ICollection<MyType> BusBookings { get; set; }
    }

    public class RegisterPassenger
    {
        // [Required]
        public string Mobile { get; set; }

        // [Required]
        public string Name { get; set; }

        //[Required]
        // [EmailAddress(ErrorMessage = "Invalid Email")]
        public string Email { get; set; }

        //[Required]

        public int? Sex { get; set; }

        //sign in and sign up


        public string Password { get; set; }

    }

    public class UpdatePassenger
    {
        public string Mobile { get; set; }

        public string Name { get; set; }


        public string Email { get; set; }


        public int? Sex { get; set; }
        public string NextOfKin { get; set; }
        public string NextOfKinMobile { get; set; }


    }


    public class MyType
    {
        public string BusRouteId { get; set; }

        public string DepartureDate { get; set; }
        public string UnitAmount { get; set; }
        public string DepartureTerminalId { get; set; }
        public string DestinationTerminalId { get; set; }
        public string DepartureTerminalName { get; set; }
        public string DestinationTerminalName { get; set; }
    }

    public class SignUp
    {
        public string id { get; set; }
        public string passCode { get; set; }


    }

    public class PaySwitchResponseModel
    {

        public string APIKey { get; set; }
        public string merchantKey { get; set; }
        public string buttonurl { get; set; }
        public string Currency { get; set; }
        public string merchant { get; set; }
        public string amount { get; set; }

        public string redirect_url { get; set; }
        public string customer_email { get; set; }

        public string transid { get; set; }




    }
    public class PasswordReset
    {
        public string Username { get; set; }
        public string VerificationCode { get; set; }
        public string NewPassword { get; set; }
    }

    public class PasswordActivationCode
    {
        public string Username { get; set; }
    }

    public class ProcessPayStackPayment

    {
        public string email { get; set; }

        public int amount { get; set; }

        public string RefCode { get; set; }

        public string PayStackReference { get; set; }
    }

    enum BanksNumbers
    {
        GTBank = 080679,

    };

    public enum PartnerType
    {
        Corporate,
        Individual
    }

    public class QuickTellerResponseModel
    {
        public string Reference { get; set; }
        public string PaymentLogId { get; set; }
        public string PaymentReference { get; set; }
        public decimal Amount { get; set; }
        public string ReceiptNo { get; set; }
        public string Status { get; set; }
    }

    public class ClientWebRequest
    {
        public CustomerInformationRequest CustomerInformationRequest { get; set; }

        public PaymentNotificationRequest PaymentNotificationRequest { get; set; }
    }

    public class CustomerInformationRequest
    {
        public string ServiceUsername { get; set; }
        public string ServicePassword { get; set; }
        public string MerchantReference { get; set; }

        [JsonProperty(PropertyName = "CustReference")]
        public string refCode { get; set; }

        public string PaymentItemCode { get; set; }
        public string ThirdPartyCode { get; set; }
    }

    public class PaymentNotificationRequest
    {
        public string ServiceUrl { get; set; }
        public string ServiceUsername { get; set; }
        public string ServicePassword { get; set; }
        public string FtpUrl { get; set; }
        public string FtpUsername { get; set; }
        public string FtpPassword { get; set; }
        public Payments Payments { get; set; }
    }

    public class Payments
    {
        public Payment Payment { get; set; }
    }

    public class Payment
    {
        public string IsRepeated { get; set; }
        public string ProductGroupCode { get; set; }
        public string PaymentLogId { get; set; }
        public string CustReference { get; set; }
        public string AlternateCustReference { get; set; }
        public string Amount { get; set; }

        public string PaymentStatus { get; set; }
        public string PaymentMethod { get; set; }
        public string PaymentReference { get; set; }
        public string TerminalId { get; set; }
        public string ChannelName { get; set; }
        public string Location { get; set; }

        public string IsReversal { get; set; }
        public string PaymentDate { get; set; }
        public string SettlementDate { get; set; }
        public string InstitutionId { get; set; }
        public string InstitutionName { get; set; }
        public string BranchName { get; set; }

        public string FeeName { get; set; }
        public string CustomerName { get; set; }
        public string OtherCustomerInfo { get; set; }
        public string ReceiptNo { get; set; }
        public string CollectionsAccount { get; set; }
        public string ThirdPartyCode { get; set; }

        public PaymentItems PaymentItems { get; set; }
        public string BankCode { get; set; }
        public string CustomerAddress { get; set; }
        public string CustomerPhoneNumber { get; set; }
        public string DepositorName { get; set; }
        public string DepositorSlipNumber { get; set; }
        public string PaymentCurrency { get; set; }
        public string OriginalPaymentLogId { get; set; }
        public string OriginalPaymentReference { get; set; }
        public string Teller { get; set; }

        public string Status { get; set; }
    }

    public class PaymentItems
    {
        public PaymentItem PaymentItem { get; set; }
    }


    public class PaymentItem
    {
        public string ItemName { get; set; }
        public string ItemCode { get; set; }
        public string ItemAmount { get; set; }
        public string LeadBankCode { get; set; }
        public string LeadBankCbnCode { get; set; }
        public string CategoryCode { get; set; }
        public string CategoryName { get; set; }
        public string ItemQuanity { get; set; }
    }

    public class PaymentNotificationResponse
    {
        public Payments Payments { get; set; }
    }


    public class ClientWebResponse
    {

        public CustomerInformationResponse CustomerInformationRequest { get; set; }
    }

    [XmlRoot("CustomerInformationRequest")]
    public class CustomerInformationResponse
    {
        [XmlElement("MerchantReference")]
        public string MerchantReference { get; set; }

        [XmlElement("Customers")]
        public Customers Customers { get; set; }
    }

    [XmlRoot("Customers")]
    public class Customers
    {
        [XmlElement("Customer")]
        public Customer Customer { get; set; }
    }

    [XmlRoot("Customer")]
    public class Customer
    {
        [XmlElement("Status")]
        public string Status { get; set; }

        [XmlElement("CustReference")]
        public string CustReference { get; set; }

        [XmlElement("CustomerReferenceAlternate")]
        public string CustomerReferenceAlternate { get; set; }

        [XmlElement("FirstName")]
        public string FirstName { get; set; }

        [XmlElement("LastName")]
        public string LastName { get; set; }

        [XmlElement("Email")]
        public string Email { get; set; }

        [XmlElement("Phone")]
        public string Phone { get; set; }

        [XmlElement("ThirdPartyCode")]
        public string ThirdPartyCode { get; set; }

        [XmlElement("Amount")]
        public string Amount { get; set; }
    }


    public class PickUpTerminal
    {
        [JsonProperty(PropertyName = "Id")]
        public Guid Id { get; set; }
        [JsonProperty(PropertyName = "DisplayName")]
        public string DisplayName { get; set; }
        [JsonProperty(PropertyName = "Address")]
        public string Address { get; set; }
        [JsonProperty(PropertyName = "StateId")]
        public int StateId { get; set; }
        [JsonProperty(PropertyName = "ParentTerminalId")]
        public Guid ParentTerminalId { get; set; }
        [JsonProperty(PropertyName = "Active")]
        public bool Active { get; set; }
        [JsonProperty(PropertyName = "Operation")]
        public string Operation { get; set; }
        [JsonProperty(PropertyName = "Minutes")]
        public int Minutes { get; set; }

        public DateTime NewTime { get; set; }
        [JsonProperty(PropertyName = "InitialTime")]
        public string InitialTime { get; set; }
        public string DisplayNameAndTime
        {
            get
            {
                var result = "";
                result = $"{DisplayName}-{NewTime.ToString("HH:mm tt")}";
                return result;
            }
        }


    }


    public class GetPickUpTerminals
    {

        public string departureTerminal { get; set; }
        public string initialTime { get; set; }


    }

    public class ProcessFlutterWavePayment
    {

        public string RefCode { get; set; }

    }

    public class ProcessTheTellerPayment
    {
        public string TransactionId { get; set; }
        public string RefCode { get; set; }

    }

    public class TheTellerPaymentResponse
    {
    public  string   amount {get; set;}
    public string customer_email { get; set; }
    public string transid { get; set; }

    }

    public class ProcessGlobalPay
    {

        public string RefCode { get; set; }

    }

    //GIGMS

    public class GetAcessTokenModel
    {
        public string client_id { get; set; }
        public string client_secret { get; set; }
        public string grant_type { get; set; }
        public string username { get; set; }
        public string password { get; set; }

    }

    public class GetAcessTokenResponseModel
    {
        public string access_token { get; set; }
        public string token_type { get; set; }
        public string expires_in { get; set; }
        public string roles { get; set; }
        public string user_id { get; set; }

        public string username { get; set; }
        public string profilePix { get; set; }
        public string userassignedmenu { get; set; }
        [JsonProperty(PropertyName = ".expires")]
        public string expires { get; set; }
    }
    public class TravelDocuments
    {


        [JsonProperty("Code")]
        public string Code { get; set; }

        [JsonProperty("ShortDescription")]
        public string ShortDescription { get; set; }

        [JsonProperty("Object")]
        public TravelDocumentObject Object { get; set; }



        public class TravelDocumentObject
        {
            [JsonProperty("Items")]
            public List<TravelDocumentObjectItems> Items { get; set; }
        }
        public class TravelDocumentObjectItems
        {
            [JsonProperty("TravelDocumentId")]
            public int TravelDocumentId { get; set; }

            [JsonProperty("IdentificationNumber")]
            public string IdentificationNumber { get; set; }

            [JsonProperty("IsCompulsary")]
            public bool IsCompulsary { get; set; }

            [JsonProperty("DocumentType")]
            public string DocumentType { get; set; }
        }
    }


    public class DepartureTerminals
    {


        [JsonProperty("Code")]
        public string Code { get; set; }

        [JsonProperty("ShortDescription")]
        public string ShortDescription { get; set; }

        [JsonProperty("Object")]
        public TerminalObject Object { get; set; }



        public class TerminalObject
        {
            [JsonProperty("Items")]
            public List<TerminalObjectItems> Items { get; set; }
        }
        public class TerminalObjectItems
        {
            [JsonProperty("TerminalId")]
            public int TerminalId { get; set; }

            [JsonProperty("TerminalName")]
            public string TerminalName { get; set; }

            [JsonProperty("TerminalCode")]
            public string TerminalCode { get; set; }

            [JsonProperty("TerminalImage")]
            public string TerminalImage { get; set; }

            [JsonProperty("TerminalAddress")]
            public string TerminalAddress { get; set; }

            [JsonProperty("ContactPerson")]
            public string ContactPerson { get; set; }

            [JsonProperty("ContactPersonNo")]
            public string ContactPersonNo { get; set; }

            [JsonProperty("Latitude")]
            public decimal Latitude { get; set; }

            [JsonProperty("Longitude")]
            public decimal Longitude { get; set; }

            [JsonProperty("StartDate")]
            public DateTime? StartDate { get; set; }

            [JsonProperty("EndDate")]
            public DateTime? EndDate { get; set; }

            [JsonProperty("Refcode")]
            public string Refcode { get; set; }

            [JsonProperty("BookingType")]
            public string BookingType { get; set; }

            [JsonProperty("BookingStatus")]
            public string BookingStatus { get; set; }

            [JsonProperty("StateId")]
            public int StateId { get; set; }

            [JsonProperty("StateName")]
            public string StateName { get; set; }

            [JsonProperty("RouteId")]
            public int RouteId { get; set; }

            [JsonProperty("RouteName")]
            public string RouteName { get; set; }
        }


    }

    public class DestinationTerminals
    {


        [JsonProperty("Code")]
        public string Code { get; set; }

        [JsonProperty("ShortDescription")]
        public string ShortDescription { get; set; }

        [JsonProperty("Object")]
        public IEnumerable<TerminalObject> Object { get; set; }



        //public class TerminalObject
        //{
        //    [JsonProperty("Items")]
        //    public List<TerminalObjectItems> Items { get; set; }
        //}
        public class TerminalObject
        {
            [JsonProperty("TerminalId")]
            public int TerminalId { get; set; }

            [JsonProperty("TerminalName")]
            public string TerminalName { get; set; }

            [JsonProperty("TerminalCode")]
            public string TerminalCode { get; set; }

            [JsonProperty("TerminalImage")]
            public string TerminalImage { get; set; }

            [JsonProperty("TerminalAddress")]
            public string TerminalAddress { get; set; }

            [JsonProperty("ContactPerson")]
            public string ContactPerson { get; set; }

            [JsonProperty("ContactPersonNo")]
            public string ContactPersonNo { get; set; }

            [JsonProperty("Latitude")]
            public decimal Latitude { get; set; }

            [JsonProperty("Longitude")]
            public decimal Longitude { get; set; }

            [JsonProperty("StartDate")]
            public DateTime? StartDate { get; set; }

            [JsonProperty("EndDate")]
            public DateTime? EndDate { get; set; }

            [JsonProperty("Refcode")]
            public string Refcode { get; set; }

            [JsonProperty("BookingType")]
            public string BookingType { get; set; }

            [JsonProperty("BookingStatus")]
            public string BookingStatus { get; set; }

            [JsonProperty("StateId")]
            public int StateId { get; set; }

            [JsonProperty("StateName")]
            public string StateName { get; set; }

            [JsonProperty("RouteId")]
            public int RouteId { get; set; }

            [JsonProperty("RouteName")]
            public string RouteName { get; set; }
        }


    }

    public class VehicleTripRouteSearch
    {
        public int TripType { get; set; }
        public int DepartureTerminalId { get; set; }
        public int DestinationTerminalId { get; set; }
        public string DepartureDate { get; set; }
        public string ReturnDate { get; set; }
        public int NumberOfAdults { get; set; }
        public int NumberOfChildren { get; set; }
    }
    public class PickupPointDetails
    {
        [JsonProperty("Code")]
        public string Code { get; set; }

        [JsonProperty("ShortDescription")]
        public string ShortDescription { get; set; }

        [JsonProperty("Object")]
        public List<PickupPointsresponseItems> Object { get; set; }

        public class PickupPointsresponseItems
        {
            public int PickupPointId { get; set; }
            public string PickupPointName { get; set; }
            public double Latitude { get; set; }
            public double Longitude { get; set; }
            public string Image { get; set; }
            public int TerminalId { get; set; }
            public string TerminalName { get; set; }
            public string TripId { get; set; }
            public string DepartureTime { get; set; }
            public int RouteId { get; set; }
            public string RouteName { get; set; }
            public string PickUpTime { get; set; }
            public string PickUpPointAndTime
            {
                get
                {
                    var result = PickupPointName + "(" + PickUpTime + ")";


                    return result;
                }
            }


        }
    }
    public class VehicleTripRouteSearchResponse
    {

        [JsonProperty("Code")]
        public string Code { get; set; }

        [JsonProperty("ShortDescription")]
        public string ShortDescription { get; set; }

        [JsonProperty("Object")]
        public VehicleObject Object { get; set; }

        public class VehicleObject
        {


            public int TripType { get; set; }
            public List<DepartureTripDetail> Departures { get; set; }
            public List<ArrivalTripDetail> Arrivals { get; set; }
            public List<TransitDepartureTripDetail> TransitDepartures { get; set; }
            public List<TransitArrivalTripDetail> TransitArrivals { get; set; }
            public bool HasTransit { get; set; }
            public bool IsInternational { get; set; }




        }

        public class DepartureTripDetail
        {
            public string RouteName { get; set; }
            public string VehicleName { get; set; }
            public string RouteId { get; set; }
            public bool isSub { get; set; }
            public string Currency { get; set; }
            public string RouteIdReturn { get; set; }
            public bool isSubReturn { get; set; }
            public string TripId { get; set; }
            public string PhysicalBus { get; set; }
            public string CaptainCode { get; set; }
            public DateTime DepartureDate { get; set; }
            public string DepartureTime { get; set; }
            public int AvailableNumberOfSeats { get; set; }
            public decimal FarePrice { get; set; }
            public decimal MemberFare { get; set; }
            public decimal ChildFare { get; set; }
            public decimal AdultFare { get; set; }
            public decimal ReturnFare { get; set; }
            public decimal PromoFare { get; set; }
            public string VehicleFacilities { get; set; }
            public bool HasPickup { get; set; }
            public int BookedSeat { get; set; }
            public IEnumerable<int> BookedSeats { get; set; }
            public IEnumerable<int> AvailableSeats { get; set; }
            public Guid VehicleTripRegistrationId { get; set; }
            public int TotalNumberOfSeats { get; set; }

            public string busTypeName { get; set; }
            public string DisplayBusTypeName
            {
                get
                {
                    var result = "";
                    if (VehicleName == "Mercedes (Sprinter)")
                    {
                        result = "sprinter";
                    }
                    else if (VehicleName == "Toyota (Hiace)")
                    {
                        result = "hiace";
                    }
                    else if (VehicleName == "Foton (Prime)")
                    {
                        result = "prime";
                    }
                    else if (VehicleName == "Toyota (Sienna)")
                    {
                        result = "sienna";
                    }
                    else if (VehicleName == "Toyota (Hiace X)")
                    {
                        result = "Hiace";
                    }
                    else if (VehicleName.ToLower().Contains("Jet Mover".ToLower()))
                    {
                        result = "Jetmover";
                    }
                    else if (VehicleName.ToLower().Contains("Jet Prime".ToLower()) || VehicleName.ToLower().Contains("Jet PrimeXL".ToLower()))
                    {
                        result = "Jetprime";
                    }
                    return result;
                }
            }
            public string seatheight
            {
                get
                {
                    var result = "";
                    if (TotalNumberOfSeats == 14)
                    {
                        result = "5";
                    }
                    else if (TotalNumberOfSeats == 10)
                    {
                        result = "4";
                    }
                    else if (TotalNumberOfSeats == 6)
                    {
                        result = "4";
                    }
                    else if (TotalNumberOfSeats == 12 || TotalNumberOfSeats == 13)
                    {
                        result = "5";
                    }
                    else if (TotalNumberOfSeats == 17)
                    {
                        result = "6";
                    }
                    return result;
                }
            }

            public string seatweight
            {
                get
                {
                    var result = "";
                    if (TotalNumberOfSeats == 14)
                    {
                        result = "4";
                    }
                    else if (TotalNumberOfSeats == 10)
                    {
                        result = "4";
                    }
                    else if (TotalNumberOfSeats == 6)
                    {
                        result = "4";
                    }
                    else if (TotalNumberOfSeats == 12)
                    {
                        result = "4";
                    }
                    else if (TotalNumberOfSeats == 13)
                    {
                        result = "4";
                    }
                    else if (TotalNumberOfSeats == 17)
                    {
                        result = "4";
                    }
                    return result;
                }
            }

            public string DisplaySeatUnbooked
            {
                get
                {
                    var result = "";
                    if (AvailableNumberOfSeats == 0)
                    {
                        result = "Seats Fully Booked";
                    }
                    else
                    {
                        result = $"{AvailableNumberOfSeats} seat(s) available";
                    }
                    return result;
                }
            }


        }
        public class TransitDepartureTripDetail
        {
            public string RouteName { get; set; }
            public string VehicleName { get; set; }
            public string RouteId { get; set; }
            public bool isSub { get; set; }
            public string Currency { get; set; }

            public string RouteIdReturn { get; set; }
            public bool isSubReturn { get; set; }
            public string TripId { get; set; }
            public string PhysicalBus { get; set; }
            public string CaptainCode { get; set; }
            public DateTime DepartureDate { get; set; }
            public string DepartureTime { get; set; }
            public int AvailableNumberOfSeats { get; set; }
            public decimal FarePrice { get; set; }
            public decimal MemberFare { get; set; }
            public decimal ChildFare { get; set; }
            public decimal AdultFare { get; set; }
            public decimal ReturnFare { get; set; }
            public decimal PromoFare { get; set; }
            public string VehicleFacilities { get; set; }
            public int BookedSeat { get; set; }
            public IEnumerable<int> BookedSeats { get; set; }
            public IEnumerable<int> AvailableSeats { get; set; }
            public int TotalNumberOfSeats { get; set; }
            public Guid VehicleTripRegistrationId { get; set; }

            public string busTypeName { get; set; }
            public bool HasPickup { get; set; }

            public string DisplayBusTypeName
            {
                get
                {
                    var result = "";
                    if (VehicleName == "Mercedes (Sprinter)")
                    {
                        result = "sprinter";
                    }
                    else if (VehicleName == "Toyota (Hiace)")
                    {
                        result = "hiace";
                    }
                    else if (VehicleName == "Foton (Prime)")
                    {
                        result = "prime";
                    }
                    else if (VehicleName == "Toyota (Sienna)")
                    {
                        result = "sienna";
                    }
                    else if (VehicleName == "Toyota (Hiace X)")
                    {
                        result = "Hiace";
                    }
                    else if (VehicleName.ToLower().Contains("Mover".ToLower()) && VehicleName.ToLower().Contains("Jet".ToLower()))
                    {
                        result = "Jetmover";
                    }
                    else if (VehicleName.ToLower().Contains("Jet Prime".ToLower()) || VehicleName.ToLower().Contains("Jet PrimeXL".ToLower()))
                    {
                        result = "Jetprime";
                    }

                    return result;
                }
            }
            public string seatheight
            {
                get
                {
                    var result = "";
                    if (TotalNumberOfSeats == 14)
                    {
                        result = "5";
                    }
                    else if (TotalNumberOfSeats == 10)
                    {
                        result = "4";
                    }
                    else if (TotalNumberOfSeats == 6)
                    {
                        result = "4";
                    }
                    else if (TotalNumberOfSeats == 12 || TotalNumberOfSeats == 13)
                    {
                        result = "5";
                    }
                    else if (TotalNumberOfSeats == 17)
                    {
                        result = "6";
                    }
                    return result;
                }
            }

            public string seatweight
            {
                get
                {
                    var result = "";
                    if (TotalNumberOfSeats == 14)
                    {
                        result = "4";
                    }
                    else if (TotalNumberOfSeats == 10)
                    {
                        result = "4";
                    }
                    else if (TotalNumberOfSeats == 6)
                    {
                        result = "4";
                    }
                    else if (TotalNumberOfSeats == 12)
                    {
                        result = "4";
                    }
                    return result;
                }
            }
            public string DisplaySeatUnbooked
            {
                get
                {
                    var result = "";
                    if (AvailableNumberOfSeats == 0)
                    {
                        result = "Seats Fully Booked";
                    }
                    else
                    {
                        result = $"{AvailableNumberOfSeats} seat(s) available";
                    }
                    return result;
                }
            }

        }


        public class TransitArrivalTripDetail
        {
            public string RouteName { get; set; }
            public string VehicleName { get; set; }
            public string RouteId { get; set; }
            public bool isSub { get; set; }
            public string Currency { get; set; }

            public string RouteIdReturn { get; set; }
            public bool isSubReturn { get; set; }
            public string TripId { get; set; }
            public string PhysicalBus { get; set; }
            public string CaptainCode { get; set; }
            public DateTime DepartureDate { get; set; }
            public string DepartureTime { get; set; }
            public int AvailableNumberOfSeats { get; set; }
            public decimal FarePrice { get; set; }
            public decimal MemberFare { get; set; }
            public decimal ChildFare { get; set; }
            public decimal AdultFare { get; set; }
            public decimal ReturnFare { get; set; }
            public decimal PromoFare { get; set; }
            public string VehicleFacilities { get; set; }
            public int BookedSeat { get; set; }
            public IEnumerable<int> BookedSeats { get; set; }
            public IEnumerable<int> AvailableSeats { get; set; }
            public int TotalNumberOfSeats { get; set; }
            public Guid VehicleTripRegistrationId { get; set; }

            public string busTypeName { get; set; }
            public bool HasPickup { get; set; }

            public string DisplayBusTypeName
            {
                get
                {
                    var result = "";
                    if (VehicleName == "Mercedes (Sprinter)")
                    {
                        result = "sprinter";
                    }
                    else if (VehicleName == "Toyota (Hiace)")
                    {
                        result = "hiace";
                    }
                    else if (VehicleName == "Foton (Prime)")
                    {
                        result = "prime";
                    }
                    else if (VehicleName == "Toyota (Sienna)")
                    {
                        result = "sienna";
                    }
                    else if (VehicleName == "Toyota (Hiace X)")
                    {
                        result = "Hiace";
                    }
                    else if (VehicleName.ToLower().Contains("Mover".ToLower()) && VehicleName.ToLower().Contains("Jet".ToLower()))
                    {
                        result = "Jetmover";
                    }
                    else if (VehicleName.ToLower().Contains("Jet Prime".ToLower()) || VehicleName.ToLower().Contains("Jet PrimeXL".ToLower()))
                    {
                        result = "Jetprime";
                    }

                    return result;
                }
            }
            public string seatheight
            {
                get
                {
                    var result = "";
                    if (TotalNumberOfSeats == 14)
                    {
                        result = "5";
                    }
                    else if (TotalNumberOfSeats == 10)
                    {
                        result = "4";
                    }
                    else if (TotalNumberOfSeats == 6)
                    {
                        result = "4";
                    }
                    else if (TotalNumberOfSeats == 12 || TotalNumberOfSeats == 13)
                    {
                        result = "5";
                    }
                    else if (TotalNumberOfSeats == 17)
                    {
                        result = "6";
                    }
                    return result;
                }
            }

            public string seatweight
            {
                get
                {
                    var result = "";
                    if (TotalNumberOfSeats == 14)
                    {
                        result = "4";
                    }
                    else if (TotalNumberOfSeats == 10)
                    {
                        result = "4";
                    }
                    else if (TotalNumberOfSeats == 6)
                    {
                        result = "4";
                    }
                    else if (TotalNumberOfSeats == 12)
                    {
                        result = "4";
                    }
                    return result;
                }
            }
            public string DisplaySeatUnbooked
            {
                get
                {
                    var result = "";
                    if (AvailableNumberOfSeats == 0)
                    {
                        result = "Seats Fully Booked";
                    }
                    else
                    {
                        result = $"{AvailableNumberOfSeats} seat(s) available";
                    }
                    return result;
                }
            }

        }

        public class ArrivalTripDetail
        {
            public string RouteName { get; set; }
            public string VehicleName { get; set; }
            public string RouteId { get; set; }
            public bool isSub { get; set; }
            public string Currency { get; set; }

            public string RouteIdReturn { get; set; }
            public bool isSubReturn { get; set; }
            public string TripId { get; set; }
            public string PhysicalBus { get; set; }
            public string CaptainCode { get; set; }
            public DateTime DepartureDate { get; set; }
            public string DepartureTime { get; set; }
            public int AvailableNumberOfSeats { get; set; }
            public decimal FarePrice { get; set; }
            public decimal MemberFare { get; set; }
            public decimal ChildFare { get; set; }
            public decimal AdultFare { get; set; }
            public decimal ReturnFare { get; set; }
            public decimal PromoFare { get; set; }
            public string VehicleFacilities { get; set; }
            public int BookedSeat { get; set; }
            public IEnumerable<int> BookedSeats { get; set; }
            public IEnumerable<int> AvailableSeats { get; set; }
            public int TotalNumberOfSeats { get; set; }
            public Guid VehicleTripRegistrationId { get; set; }

            public string busTypeName { get; set; }
            public bool HasPickup { get; set; }

            public string DisplayBusTypeName
            {
                get
                {
                    var result = "";
                    if (VehicleName == "Mercedes (Sprinter)")
                    {
                        result = "sprinter";
                    }
                    else if (VehicleName == "Toyota (Hiace)")
                    {
                        result = "hiace";
                    }
                    else if (VehicleName == "Foton (Prime)")
                    {
                        result = "prime";
                    }
                    else if (VehicleName == "Toyota (Sienna)")
                    {
                        result = "sienna";
                    }
                    else if (VehicleName == "Toyota (Hiace X)")
                    {
                        result = "Hiace";
                    }
                    else if (VehicleName.ToLower().Contains("Mover".ToLower()) && VehicleName.ToLower().Contains("Jet".ToLower()))
                    {
                        result = "Jetmover";
                    }
                    else if (VehicleName.ToLower().Contains("Jet Prime".ToLower()) || VehicleName.ToLower().Contains("Jet PrimeXL".ToLower()))
                    {
                        result = "Jetprime";
                    }

                    return result;
                }
            }
            public string seatheight
            {
                get
                {
                    var result = "";
                    if (TotalNumberOfSeats == 14)
                    {
                        result = "5";
                    }
                    else if (TotalNumberOfSeats == 10)
                    {
                        result = "4";
                    }
                    else if (TotalNumberOfSeats == 6)
                    {
                        result = "4";
                    }
                    else if (TotalNumberOfSeats == 12 || TotalNumberOfSeats == 13)
                    {
                        result = "5";
                    }
                    else if (TotalNumberOfSeats == 17)
                    {
                        result = "6";
                    }
                    return result;
                }
            }

            public string seatweight
            {
                get
                {
                    var result = "";
                    if (TotalNumberOfSeats == 14)
                    {
                        result = "4";
                    }
                    else if (TotalNumberOfSeats == 10)
                    {
                        result = "4";
                    }
                    else if (TotalNumberOfSeats == 6)
                    {
                        result = "4";
                    }
                    else if (TotalNumberOfSeats == 12)
                    {
                        result = "4";
                    }
                    return result;
                }
            }
            public string DisplaySeatUnbooked
            {
                get
                {
                    var result = "";
                    if (AvailableNumberOfSeats == 0)
                    {
                        result = "Seats Fully Booked";
                    }
                    else
                    {
                        result = $"{AvailableNumberOfSeats} seat(s) available";
                    }
                    return result;
                }
            }

        }




    }
    public class PostSearchModel
    {
        public int TripType { get; set; }
        public string Currency { get; set; }
        public int PaymentMethod { get; set; }
        public string PosReference { get; set; }
        public int BookingType { get; set; }
        public int PassengerType { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int Gender { get; set; }
        public int RouteId { get; set; }
        public bool isSub { get; set; }
        public int? RouteIdReturn { get; set; }
        public bool isSubReturn { get; set; }
        public string Amount { get; set; }
        public bool IsLoggedIn { get; set; }
        public int? PickUpId { get; set; }
        public int PickupStatus { get; set; }
        public int? ReturnPickUpId { get; set; }
        public int ReturnPickupStatus { get; set; }
        public int? Discount { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string NextOfKinName { get; set; }
        public string NextOfKinPhone { get; set; }
        public string SeatRegistrations { get; set; }
        public List<GigmsBookingBeneficiary> Beneficiaries { get; set; }
        public string SeatNumber { get; set; }
        public string TransactionRefCode { get; set; }
        public string IdentificationNumber { get; set; }
        public int? TravelDocumentId { get; set; }
    }

    public class GigmsBookingBeneficiary
    {
        public string FullName { get; set; }
        public int SeatNumber { get; set; }
        public int Gender { get; set; }
        public int PassengerType { get; set; }
        public string IdentificationNumber { get; set; }
        public int? TravelDocumentId { get; set; }
    }

    public class PostSearchResponseModel
    {


        [JsonProperty("Code")]
        public string Code { get; set; }

        [JsonProperty("ShortDescription")]
        public string ShortDescription { get; set; }

        [JsonProperty("Object")]
        public BookingResponse Object { get; set; }



        public class BookingResponse
        {
            [JsonProperty("SeatNumber")]
            public int SeatNumber { get; set; }

            [JsonProperty("Response")]
            public string Response { get; set; }

            [JsonProperty("Amount")]
            public decimal Amount { get; set; }

            [JsonProperty("MainBookerId")]
            public string MainBookerId { get; set; }

            [JsonProperty("BookingReferenceCode")]
            public string BookingReferenceCode { get; set; }

            [JsonProperty("Route")]
            public string Route { get; set; }

            [JsonProperty("DepartureDate")]
            public string DepartureDate { get; set; }

            [JsonProperty("PickUpDetails")]
            public string PickUpDetails { get; set; }

            [JsonProperty("DepartureTime")]
            public string DepartureTime { get; set; }

            [JsonProperty("TransactionRefCode")]
            public string TransactionRefCode { get; set; }
            [JsonProperty("IdentificationNumber")]
            public string IdentificationNumber { get; set; }


            [JsonProperty("IdentificationType")]
            public string IdentificationType { get; set; }
        }


    }

    public class CountryResponse
    {
        [JsonProperty("Code")]
        public string Code { get; set; }

        [JsonProperty("ShortDescription")]
        public string ShortDescription { get; set; }

        [JsonProperty("Object")]
        public CountryDetails Object { get; set; }
        public class CountryDetails
        {
            public string CountryCode { get; set; }

            public string CurrencyName { get; set; }

            public string CurrencySymbol { get; set; }
            public string CountryName { get; set; }

            public string TelephoneCode { get; set; }
            

        }
    }


    public class BookingDetails
    {
        [JsonProperty("Code")]
        public string Code { get; set; }

        [JsonProperty("ShortDescription")]
        public string ShortDescription { get; set; }

        [JsonProperty("Object")]
        public BookingPassengerDetails Object { get; set; }
        public class BookingPassengerDetails
        {
            public string SeatManagementId { get; set; }
            public string BookingId { get; set; }
            public string SeatNumber { get; set; }
            public string RemainingSeat { get; set; }
            public string BookingReferenceCode { get; set; }
            public string MainBookerReferenceCode { get; set; }
            public string PhoneNumber { get; set; }
            public string CreatedBy { get; set; }
            public string NextOfKinName { get; set; }
            public string NextOfKinPhoneNumber { get; set; }
            public string FullName { get; set; }
            public string DepartureTime { get; set; }
            public string DateCreated { get; set; }
            public string VehicleName { get; set; }
            public string DepartureDate { get; set; }
            public decimal? Amount { get; set; }
            public decimal? Discount { get; set; }
            public Gender Gender { get; set; }
            public bool HasReturn { get; set; }
            public bool IsReturn { get; set; }
            public int NoOfTicket { get; set; }
            public string PickupPointImage { get; set; }
            public string RouteName { get; set; }
            public int? PickUpPointId { get; set; }
            public string PickupPointName { get; set; }
            public BookingStatus BookingStatus { get; set; }
            public string PickupStatus { get; set; }
            public string TravelStatus { get; set; }
            public string VehicleTripRegistration { get; set; }
            public string IdentificationNumber { get; set; }
            public string IdentificationType { get; set; }
        }


    }

    public enum FinanceMode
    {
        Self,
        Bank
    }

    public enum Gender
    {
        Male,
        Female
    }

    public enum BookingStatus
    {
        Pending,
        Approved,
        Canceled,
        Created,
        Declined,
        Expired,
        Failed,
        OnLock,
        OnPayment,
        Ongoing,
        Abandoned,
        Refunded,
        Reversed,
        TransactionError,
        Unsuccessful,
        GtbCancelled
    }

    public class SignUpModel
    {
        public string Name { get; set; }

        public string Email { get; set; }

        public string PhoneNumber { get; set; }

        public int Gender { get; set; }

        public string Password { get; set; }

    }

    public class SignUpResponseModel
    {

        [JsonProperty("Code")]
        public string Code { get; set; }

        [JsonProperty("ShortDescription")]
        public string ShortDescription { get; set; }

        [JsonProperty("Object")]
        public GigmsPassenger Object { get; set; }


    }

    public class GigmsPassenger
    {
        public string UserId { get; set; }

        public bool IsActive { get; set; }


        public string UserType { get; set; }
        public string Gender { get; set; }

        public string FirstName { get; set; }
        public string LastName { get; set; }

        public string Email { get; set; }
        public string PhoneNumber { get; set; }

        public string Image { get; set; }

    }

    public class GigmsVerifyCodeModel
    {
        public string Username { get; set; }
        public string VerificationCode { get; set; }


    }

    public class GigmsSignInModel
    {
        public string UserName { get; set; }
        public string Password { get; set; }


    }

    public class GigmsBookings
    {

        [JsonProperty("Code")]
        public string Code { get; set; }

        [JsonProperty("ShortDescription")]
        public string ShortDescription { get; set; }

        [JsonProperty("Object")]
        public List<BookingPassengerHistory> Object { get; set; }


        public class BookingPassengerHistory
        {
            public string SeatManagementId { get; set; }
            public string BookingId { get; set; }
            public string SeatNumber { get; set; }
            public string RemainingSeat { get; set; }
            public string BookingReferenceCode { get; set; }
            public string MainBookerReferenceCode { get; set; }
            public string PhoneNumber { get; set; }
            public string CreatedBy { get; set; }
            public string NextOfKinName { get; set; }
            public string NextOfKinPhoneNumber { get; set; }
            public string FullName { get; set; }
            public string DepartureTime { get; set; }
            public string DateCreated { get; set; }
            public string VehicleName { get; set; }
            public string DepartureDate { get; set; }
            public decimal? Amount { get; set; }
            public decimal? Discount { get; set; }
            public Gender Gender { get; set; }
            public bool HasReturn { get; set; }
            public bool IsReturn { get; set; }
            public int? NoOfTicket { get; set; }
            public string PickupPointImage { get; set; }

            public string RouteName { get; set; }

            public int? PickUpPointId { get; set; }
            public string PickupPointName { get; set; }

            public BookingStatus BookingStatus { get; set; }
            public string PickupStatus { get; set; }
            public string TravelStatus { get; set; }
            public string VehicleTripRegistration { get; set; }


        }

    }


    public class ForgotPaswordActivationModel
    {

        [JsonProperty("Code")]
        public string Code { get; set; }

        [JsonProperty("ShortDescription")]
        public string ShortDescription { get; set; }

        [JsonProperty("Object")]
        public bool Object { get; set; }


    }



    public class TicketBookingDto
    {
        [JsonProperty("Code")]
        public string Code { get; set; }

        [JsonProperty("ShortDescription")]
        public string ShortDescription { get; set; }

        [JsonProperty("Object")]
        public List<BookingPassengerTicketDetails> Object { get; set; }

        public class BookingPassengerTicketDetails
        {

            public Guid? VehicleTripRegistrationId { get; set; }
            public Guid? TripId { get; set; }
            public long? SeatManagementId { get; set; }
            public string Refcode { get; set; }
            public string RescheduleReferenceCode { get; set; }
            public string VehicleModel { get; set; }
            public int? SeatNumber { get; set; }
            public DateTime? StartDate { get; set; }
            public DateTime? EndDate { get; set; }
            public string TicketValidity { get; set; }
            public string CustomerNumber { get; set; }
            public string CustomerName { get; set; }

            public string NokNumber { get; set; }
            public string NokName { get; set; }
            public DateTime? BookedDate { get; set; }
            public DateTime? DepartureDate { get; set; }
            public int? NoofTicket { get; set; }
            public decimal? Amount { get; set; }

            public BookingStatus? BookingStatus { get; set; }
            public string TravelStatus { get; set; }
            public string RescheduleStatus { get; set; }
            public string BookingType { get; set; }
            public bool IsRescheduled { get; set; }
            public int? RouteId { get; set; }
            public int? TerminalId { get; set; }
            public string TerminalName { get; set; }
            public string Email { get; set; }
            public string Route { get; set; }
            public string CreatedBy { get; set; }
        }
    }

    public class TicketBookingRequest
    {

        public string Refcode { get; set; }

    }

    public class CreateRescheduleRequest
    {
        public string refCode;
        public long? SeatManagementId { get; set; }
        public long? BookingId { get; set; }
        public int? SeatNumber { get; set; }
        public int? RemainingSeat { get; set; }
        public string BookingReferenceCode { get; set; }
        public string NewDate { get; set; }
        public int? RouteId { get; set; }

    }

    public class CreateRescheduleResponse
    {
        [JsonProperty("Code")]
        public string Code { get; set; }

        [JsonProperty("ShortDescription")]
        public string ShortDescription { get; set; }

        [JsonProperty("Object")]
        public bool Object { get; set; }


    }

    public class Getavailabletrip
    {
        [JsonProperty("Code")]
        public string Code { get; set; }

        [JsonProperty("ShortDescription")]
        public string ShortDescription { get; set; }

        [JsonProperty("Object")]
        public List<Reschedule> Object { get; set; }

        public class Reschedule
        {
            public long SeatManagementId { get; set; }
            public int? RouteId { get; set; }
            public Guid? TripId { get; set; }
            public Guid? VehicleTripRegistrationId { get; set; }
            public string PhoneNumber { get; set; }
            public string FullName { get; set; }
            public string RouteName { get; set; }
            public string DepartureTime { get; set; }
            public DateTime? DepartureDate { get; set; }
            public DateTime NewDate { get; set; }
            public string RescheduleMode { get; set; }
            public decimal? Amount { get; set; }
            public int SeatNumber { get; set; }
            public string BookingReferenceCode { get; set; }
        }
    }

    public class GetRemainingSeat
    {
        [JsonProperty("Code")]
        public string Code { get; set; }

        [JsonProperty("ShortDescription")]
        public string ShortDescription { get; set; }

        [JsonProperty("Object")]
        public RemainingSeat Object { get; set; }

        public class RemainingSeat
        {
            public Guid? VehicleTripRegistrationId { get; set; }
            public IList<int> remainingSeat { get; set; }

        }



    }

    public class newRescheduleRefcode
    {
        [JsonProperty("Code")]
        public string Code { get; set; }

        [JsonProperty("ShortDescription")]
        public string ShortDescription { get; set; }

        [JsonProperty("Object")]
        public string Object { get; set; }


    }

    //Google map model


    public class Distance
    {
        public string text { get; set; }
        public int value { get; set; }
    }

    public class Duration
    {
        public string text { get; set; }
        public int value { get; set; }
    }

    public class Element
    {
        public Distance distance { get; set; }
        public Duration duration { get; set; }
        public string status { get; set; }
    }

    public class Row
    {
        public List<Element> elements { get; set; }
    }

    public class GoogleRootObject
    {
        public List<string> destination_addresses { get; set; }
        public List<string> origin_addresses { get; set; }
        public List<Row> rows { get; set; }
        public string status { get; set; }
    }

    //end of google map model

    public class GetHireVehicleRequest
    {
        public int HiredServiceType { get; set; }
        public string OnewayPickupLocation { get; set; }
        public string OneWayDropoffLocation { get; set; }
        public string OnewayDistanceApart { get; set; }
        public string OnewayPickupDate { get; set; }
        public bool IsSleepOver { get; set; }


    }

    public class GetHireVehicleRequestReturn
    {
        public int HiredServiceType { get; set; }
        public string OnewayPickupLocation { get; set; }
        public string OneWayDropoffLocation { get; set; }
        public string OnewayDistanceApart { get; set; }
        public string OnewayPickupDate { get; set; }
        public bool IsSleepOver { get; set; }
        public string ReturnPickupLocation { get; set; }
        public string ReturnDropoffLocation { get; set; }
        public string ReturnDistanceApart { get; set; }
        public string ReturnPickupDate { get; set; }


    }



    public class getVehicleForHireResponse
    {

        [JsonProperty("Code")]
        public string Code { get; set; }

        [JsonProperty("ShortDescription")]
        public string ShortDescription { get; set; }

        [JsonProperty("Object")]
        public GroupedHireServiceDetailDto Object { get; set; }
    }
    public class GroupedHireServiceDetailDto
    {
        public int? HiredServiceType { get; set; }
        public List<HiredServiceBookingSearchDto> Departures { get; set; }
        public List<HiredServiceBookingSearchDto> Arrivals { get; set; }
    }

    public class HiredServiceBookingSearchDto
    {
        public int HiredServiceBookingId { get; set; }

        public int? HiredServiceType { get; set; }
        public string OnewayPickupLocation { get; set; }
        public string OneWayDropoffLocation { get; set; }
        public string ReturnPickupLocation { get; set; }
        public string ReturnDropoffLocation { get; set; }
        public string OnewayDistanceApart { get; set; }
        public string ReturnDistanceApart { get; set; }
        public int? NoofBuses { get; set; }
        public DateTime? OnewayPickupDate { get; set; }
        public DateTime? ReturnPickupDate { get; set; }
        public bool IsSleepOver { get; set; }
        public int VehicleModelId { get; set; }
        public string VehicleModelName { get; set; }
        public decimal FarePrice { get; set; }
        public decimal SleepOverPrice { get; set; }
        public string Currency { get; set; }


    }

    public class HireVehicleDetail
    {
        public int VehicleModelId { get; set; }
        public int NoOfBookedVehicle { get; set; }
        public decimal FarePrice { get; set; }
        public decimal SleepOverPrice { get; set; }
        public string Currency { get; set; }

    }

    public class GetHireRefcodeRequest
    {
        public string FullName { get; set; }
        public string Gender { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }
        public string Currency { get; set; }

        public Int32 Amount { get; set; }
        public string NextOfKinName { get; set; }
        public string NextOfKinPhoneNumber { get; set; }
        public string PaymentMethod { get; set; }
        public int HiredServiceType { get; set; }
        public string OnewayPickupLocation { get; set; }
        public string OneWayDropoffLocation { get; set; }
        public string OnewayDistanceApart { get; set; }
        public string OnewayPickupDate { get; set; }
        public string IsSleepOver { get; set; }
        public List<HireVehicleDetail> HireVehicleDetail { get; set; }
    }

    public class GetHireRefcodeRequestReturn
    {
        public string FullName { get; set; }
        public string Gender { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }
        public Int32 Amount { get; set; }
        public string NextOfKinName { get; set; }
        public string NextOfKinPhoneNumber { get; set; }
        public int HiredServiceType { get; set; }
        public string PaymentMethod { get; set; }
        public string OnewayPickupLocation { get; set; }
        public string OneWayDropoffLocation { get; set; }
        public string ReturnPickupLocation { get; set; }
        public string ReturnDropoffLocation { get; set; }
        public string OnewayDistanceApart { get; set; }
        public string ReturnDistanceApart { get; set; }
        public string OnewayPickupDate { get; set; }
        public string ReturnPickupDate { get; set; }
        public string IsSleepOver { get; set; }
        public string Currency { get; set; }

        public List<HireVehicleDetail> HireVehicleDetail { get; set; }
    }
    public class VehicleModel
    {
        public int VehicleModelId { get; set; }
        public string VehicleModelName { get; set; }
        public int NumberOfSeats { get; set; }
        public int VehicleMakeId { get; set; }
        public string VehicleMakeName { get; set; }

    }



    public class PostHireResponseModel
    {


        [JsonProperty("Code")]
        public string Code { get; set; }

        [JsonProperty("ShortDescription")]
        public string ShortDescription { get; set; }

        [JsonProperty("Object")]
        public HireBookingResponse Object { get; set; }



        public class HireBookingResponse
        {
            public string Response { get; set; }
            public decimal Amount { get; set; }
            public string BookingReferenceCode { get; set; }
            public string Route { get; set; }
            public string DepartureDate { get; set; }
            public string DepartureTime { get; set; }
            public bool isOneWay { get; set; }
            public string HiredServiceType { get; set; }
            public string OutOfState { get; set; }
            public string ArrivalDate { get; set; }
            public string ArrivalTime { get; set; }
            public string isSleepOver { get; set; }
            public List<VehicleModel> VehicleModel { get; set; }

        }


    }

    public class getHireRefcodeResponse
    {

        [JsonProperty("Code")]
        public string Code { get; set; }

        [JsonProperty("ShortDescription")]
        public string ShortDescription { get; set; }

        [JsonProperty("Object")]
        public hireRefcodeAmount Object { get; set; }


    }


    public class hireRefcodeAmount
    {

        public decimal Amount { get; set; }
        public string RefCode { get; set; }



    }

    public class AddressComponent
    {
        public string long_name { get; set; }
        public string short_name { get; set; }
        public List<string> types { get; set; }
    }

    public class Location
    {
        public double lat { get; set; }
        public double lng { get; set; }
    }

    public class Northeast
    {
        public double lat { get; set; }
        public double lng { get; set; }
    }

    public class Southwest
    {
        public double lat { get; set; }
        public double lng { get; set; }
    }

    public class Viewport
    {
        public Northeast northeast { get; set; }
        public Southwest southwest { get; set; }
    }

    public class Geometry
    {
        public Location location { get; set; }
        public string location_type { get; set; }
        public Viewport viewport { get; set; }
    }

    public class mapResult
    {
        public List<AddressComponent> address_components { get; set; }
        public string formatted_address { get; set; }
        public Geometry geometry { get; set; }
        public string place_id { get; set; }
        public List<string> types { get; set; }
    }

    public class mapRootObject
    {
        public List<mapResult> results { get; set; }
        public string status { get; set; }
    }
    public class DistanceDouble
    {
        public double distanceInKiloMeter { get; set; }
    }
    public class BusSelection
    {
        public int Id { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public string BusName { get; set; }
        public decimal SleepOverPrice { get; set; }
        public string Currency { get; set; }

        public decimal TotalPrice
        {
            get
            {
                return (Quantity * Price) + (Quantity * SleepOverPrice);
            }
        }
        public decimal TotalwithoutSleep
        {
            get
            {
                return Quantity * Price;
            }
        }
        public decimal TotalSleepOverPrice
        {
            get
            {
                return Quantity * SleepOverPrice;
            }
        }
    }

    public class PaymentConfirmaton
    {
        public PostSearchModel BookingRequest { get; set; }
        public BookingResponse BookingResponse { get; set; }

    }

    public class PaymentConfirmatonHire
    {
        public GetHireRefcodeRequestReturn BookingRequestReturn { get; set; }
        public GetHireRefcodeRequest BookingRequest { get; set; }
        public getVehicleForHireResponse BookingResponse { get; set; }
        public hireRefcodeAmount HirePayResponse { get; set; }
    }

    public class HireBusVm
    {
        public int TripType { get; set; }
        public bool RetainOvernight { get; set; }
        public String DestinationPoint { get; set; }
        public String DeparturePoint { get; set; }
        public String DepartureDate { get; set; }
        public String ReturnDate { get; set; }
    }

    public class HireBusBookingVm
    {
        public GetHireRefcodeRequestReturn HireRequestReturn { get; set; }
        public GetHireRefcodeRequest HireRequest { get; set; }
    }

    public class RouteObject
    {
        public int? RouteId { get; set; }
        public String RouteName { get; set; }
        public int? RouteType { get; set; }
        public decimal? DispatchFee { get; set; }
        public decimal? CaptainFee { get; set; }
        public decimal? LoaderFee { get; set; }
        public int? ParentRouteId { get; set; }
        public String ParentRoute { get; set; }
        public bool? InWorkshop { get; set; }
        public int? JourneyType { get; set; }
        public int? DepartureTerminalId { get; set; }
        public String DepartureTerminalName { get; set; }
        public bool? AvailableAtTerminal { get; set; }
        public bool? AvailableOnline { get; set; }
        public int? DestinationTerminalId { get; set; }
        public String DestinationTerminalName { get; set; }
        public int? RouteTypeId { get; set; }
        public String RouteTypeName { get; set; }
        public List<TripObject> Schedule { get; set; }
    }

    public class TravelSchedule
    {
        [JsonProperty("Code")]
        public String Code { get; set; }
        [JsonProperty("ShortDescription")]
        public String ShortDescription { get; set; }
        [JsonProperty("Object")]
        public List<RouteObject> Object { get; set; }
    }
    public class TripObject
    {
        public String TripId { get; set; }
        public String DepartureTime { get; set; }
        public String ParentDepartureTime { get; set; }
        public String TripCode { get; set; }
        public int? RouteId { get; set; }
        public String RouteName { get; set; }
        public String ParentRouteName { get; set; }
        public int? ParentTripId { get; set; }
        public int? VehicleModelId { get; set; }
        public bool AvailableOnline { get; set; }
        public String VehicleModelName { get; set; }
    }
    public class Trip
    {
        public String Code { get; set; }
        public String ShortDescription { get; set; }
        public List<TripObject> Object { get; set; }
    }

    public class SavePartnerResponse
    {

        [JsonProperty("Code")]
        public string Code { get; set; }

        [JsonProperty("ShortDescription")]
        public string ShortDescription { get; set; }

        [JsonProperty("Object")]
        public PartnerEnquiryDto Object { get; set; }
    }

    public class PartnerEnquiryDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string MiddleName { get; set; }
        public Gender Gender { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public string BusinessAddress { get; set; }
        public string NumberOfVehicles { get; set; }
        public string VehicleSpec { get; set; }
        public string CompanyName { get; set; }
        public string CompanyRcNumber { get; set; }
        public string InspectionLocation { get; set; }
        public PartnerType PartnerType { get; set; }
        public FinanceMode FinanceMode { get; set; }
        public string State { get; set; }
        public List<PartnerVehicleDto> Vehicles { get; set; }
    }

    public class PartnerVehicleDto
    {
        public int EnquiryId { get; set; }
        public string VehicleMake { get; set; }
        public string VehicleModel { get; set; }
        public string Date { get; set; }
        public string Colour { get; set; }
        public int Mileage { get; set; }
        public int Count { get; set; }
        public string OtherColor { get; set; }
        public string OtherModel { get; set; }
    }


}