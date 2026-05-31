using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HotelDataAceess.Migrations
{
    /// <inheritdoc />
    public partial class UpdateTableUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "UQ__Users__AA2FFB84A120F0B3",
                table: "Users");

            migrationBuilder.AlterColumn<int>(
                name: "PersonID",
                table: "Users",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "UQ__Users__AA2FFB84A120F0B3",
                table: "Users",
                column: "PersonID",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "UQ__Users__AA2FFB84A120F0B3",
                table: "Users");

            migrationBuilder.AlterColumn<int>(
                name: "PersonID",
                table: "Users",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.CreateIndex(
                name: "UQ__Users__AA2FFB84A120F0B3",
                table: "Users",
                column: "PersonID",
                unique: true,
                filter: "[PersonID] IS NOT NULL");
        }
    }
}
