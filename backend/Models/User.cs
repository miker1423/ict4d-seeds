using System.ComponentModel.DataAnnotations;

namespace Backend.Models;

public class User{
    [Key]
    public int UserID { get; init;}
    public string? userEmail {get; init;}
    public byte[]? pw {get; set; }
    public byte[]? salt {get; set;}
    public string? org{get; set;}

    //organization --> Role

}

public class UserVM {
    public string? Name { get; set; }
    public string? Password {get; set;}
    public string? Org {get; set;}
}