using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HotelDataAceess.Migrations
{
    /// <inheritdoc />
    public partial class DeleteImage : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PersonalImagePath",
                table: "People");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PersonalImagePath",
                table: "People",
                type: "nvarchar(500)",
                maxLength: 500,
                nullable: true);
        }
    }
}
