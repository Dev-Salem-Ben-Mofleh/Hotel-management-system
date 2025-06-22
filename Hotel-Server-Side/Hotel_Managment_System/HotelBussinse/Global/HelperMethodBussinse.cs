using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HotelBussinse.Global
{
    public class HelperMethodBussinse
    {
        public static  bool CheckDate(DateTime StartDate, DateTime EndDate)
        {
            return StartDate.Year <= EndDate.Year || StartDate.Month <= EndDate.Month || StartDate.Day < EndDate.Day;
        }
        public static int GetDays(DateTime StartDate, DateTime EndDate)
        {
            return Math.Abs((StartDate - EndDate).Days);
        }
        public  static decimal CalculateThePrice(decimal roomPricePerDay, int Days)
        {
            return  (roomPricePerDay * Days);
        }
    }
}
