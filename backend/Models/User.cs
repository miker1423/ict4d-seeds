using System.ComponentModel.DataAnnotations;

namespace Backend.Models;

public class User{
    [Key]
    public int UserID { get; init;}
    public string? userEmail {get; init;}

    public byte[]? pw {get; set; }
    public byte[]? salt {get; set;}


    //organization --> Role
    //name
    //
}