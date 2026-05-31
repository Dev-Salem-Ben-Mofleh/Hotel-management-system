namespace Hotel_Server_Side.Global
{
    public class HelperMethod
    {
        public static bool IsInvalidId(int id)
        {
            return id <= 0;
        }

        public static bool IsInvalid(short pageNumber, int pageSize)
        {
            return pageNumber <= 0 || pageSize <= 0;

        }


    }
}
