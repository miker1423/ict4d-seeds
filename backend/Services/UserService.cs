using System.ComponentModel.DataAnnotations;
using Backend.Data;
using Backend.Models;
using Backend.Services.Interfaces;
using System.Security.Cryptography;
using System.Text;

namespace Backend.Services;

public class UserController : IUserService
{
    public Task<User> CreateUser(UserVM recieved_user)
    {
        byte[] newsalt = GenerateSalt(recieved_user.Password.Length);
        byte[] pwbytes = Encoding.ASCII.GetBytes(recieved_user.Password); 
        byte[] pwhash = GenerateHash(pwbytes, newsalt, 0, recieved_user.Password.Length);

        
        throw new NotImplementedException();
    }

    public List<User> GetAllUsers()
    {
        throw new NotImplementedException();
    }

    public List<User> GetAllUsersInOrg(string org_name)
    {
        throw new NotImplementedException();
    }

    public string GetUser(string username)
    {
        throw new NotImplementedException();
    }

    public bool LogIn(string username, string password)
    {
        throw new NotImplementedException();
    }

    public bool LogOut(string username)
    {
        throw new NotImplementedException();
    }

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