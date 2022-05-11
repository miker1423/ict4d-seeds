using System.ComponentModel.DataAnnotations;
using System.Security.Cryptography;

namespace Backend.Models;

public class User{
    [Key]
    public int UserID { get; init;}
    public string? userEmail {get; init;}

    public byte[]? pw {get; set; }
    public byte[]? salt {get; set;}

    private string? org_type {get; set;} //Admin, Union, LaboSemb - Could make this a smarter solution or have control

    //organization --> Role
    //name
    //
    byte[] GenerateSalt(int length)
    {
        var bytes = new byte[length];

        using (var rng = RandomNumberGenerator.Create())
        {
            rng.GetBytes(bytes);
        }

        return bytes;
    }

    byte[] GenerateHash(byte[] password, byte[] salt, int iterations, int length)
    {
        using (var deriveBytes = new Rfc2898DeriveBytes(password, salt, iterations))
        {
            return deriveBytes.GetBytes(length);
        }
    }
}