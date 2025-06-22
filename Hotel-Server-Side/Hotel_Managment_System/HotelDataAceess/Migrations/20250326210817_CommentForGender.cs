using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HotelDataAceess.Migrations
{
    /// <inheritdoc />
    public partial class CommentForGender : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<byte>(
                name: "Gender",
                table: "People",
                type: "tinyint",
                nullable: false,
                comment: "0 => Male \r\n1 => Female",
                oldClrType: typeof(byte),
                oldType: "tinyint");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<byte>(
                name: "Gender",
                table: "People",
                type: "tinyint",
                nullable: false,
                oldClrType: typeof(byte),
                oldType: "tinyint",
                oldComment: "0 => Male \r\n1 => Female");
        }
    }
}
