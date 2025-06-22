using HotelDataAceess.Entiteis;
using Microsoft.VisualBasic;
using System.Drawing.Printing;
using System.Linq.Expressions;

namespace Hotel_Server_Side.Global
{
    public class HelperMethod
    {
        public static bool IsInvalidId(int id)
        {
            return id <= 0;
        }

        public static bool IsInvalid(short pageNumber, int pageSize,string column,string value,string Operation)
        {
            return pageNumber <= 0 || pageSize <= 0 || string.IsNullOrWhiteSpace(column) || string.IsNullOrWhiteSpace(value) || string.IsNullOrWhiteSpace(value);

        }


    }
}
