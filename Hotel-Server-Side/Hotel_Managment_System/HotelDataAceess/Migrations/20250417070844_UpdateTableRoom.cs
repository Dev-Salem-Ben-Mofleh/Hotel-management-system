using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HotelDataAceess.Migrations
{
    /// <inheritdoc />
    public partial class UpdateTableRoom : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<byte>(
                name: "AvailabilityStatus",
                table: "Rooms",
                type: "tinyint",
                nullable: false,
                comment: "0 => Available \r\n1 => Unavailable \r\n1 => underMaintenance",
                oldClrType: typeof(byte),
                oldType: "tinyint");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<byte>(
                name: "AvailabilityStatus",
                table: "Rooms",
                type: "tinyint",
                nullable: false,
                oldClrType: typeof(byte),
                oldType: "tinyint",
                oldComment: "0 => Available \r\n1 => Unavailable \r\n1 => underMaintenance");
        }
    }
}
