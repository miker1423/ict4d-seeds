using Backend.Models;
using System.ComponentModel.DataAnnotations;

namespace Backend.Services.Interfaces;

public interface IUserService 
{
    Task<User> CreateUser(UserVM recieved_user);
    String GetUser(string username);
    List<User> GetAllUsers();
    List<User> GetAllUsersInOrg(string org_name);
    bool LogIn(string username, string password);
    bool LogOut(string username);
}