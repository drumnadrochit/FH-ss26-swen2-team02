using NUnit.Framework;
using NSubstitute;
using AutoMapper;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using TourPlanner.Entities;
using TourPlanner.Services;
using TourPlanner.Repositories;
using TourPlanner.API.DTO;

namespace TourPlanner.Tests.ServiceTests;

[TestFixture]
public class TourService_Tests
{
    private TourRepository _tourRepoSub;
    private IMapper _mapperSub;
    private ILogger<TourService> _loggerSub;
    private TourService _tourService;
    
    // Static dummy location instance to reuse across tests
    private static readonly Location DummyLocation = new Location(); 

    [SetUp]
    public void Setup()
    {
        // Note: In order for Substitute.For to work with concrete classes, 
        // the methods in UserRepository must be marked as 'virtual'!
        _tourRepoSub = Substitute.For<TourRepository>(new object[] { null });
        _mapperSub = Substitute.For<IMapper>();
        
        // Mock the logger dependency and pass it into the constructor
        _loggerSub = Substitute.For<ILogger<TourService>>();
        _tourService = new TourService(_tourRepoSub, _mapperSub, _loggerSub);
    }

    [Test]
    public async Task AddTour_ValidData_SetsUserIdAndReturnsDto()
    {
        // Arrange
        int userId = 5;
        var inputDto = new TourDTO { Title = "Wanderung", From = DummyLocation, To = DummyLocation, Type = "Hike" };
        var mappedTour = new Tour { Id = 1, UserId = 5 };
        var savedTour = new Tour { Id = 1, UserId = 5 };
        var outputDto = new TourDTO { Id = 1, Title = "Wanderung", From = DummyLocation, To = DummyLocation, Type = "Hike" };

        _mapperSub.Map<Tour>(inputDto).Returns(mappedTour);
        _tourRepoSub.AddTour(mappedTour).Returns(Task.FromResult(savedTour));
        _mapperSub.Map<TourDTO>(savedTour).Returns(outputDto);

        // Act
        var result = await _tourService.AddTour(userId, inputDto);

        // Assert
        Assert.That(inputDto.UserId, Is.EqualTo(5)); 
        Assert.That(result.Id, Is.EqualTo(1));
        await _tourRepoSub.Received(1).AddTour(mappedTour);
    }

    [Test]
    public async Task GetTour_ExistingTour_ReturnsMappedDto()
    {
        // Arrange
        int userId = 2;
        int tourId = 10;
        var tourFromDb = new Tour { Id = tourId, UserId = userId };
        var expectedDto = new TourDTO { Id = tourId, Title = "Tour 1", From = DummyLocation, To = DummyLocation, Type = "Bike" };

        _tourRepoSub.GetTourById(userId, tourId).Returns(Task.FromResult(tourFromDb));
        _mapperSub.Map<TourDTO>(tourFromDb).Returns(expectedDto);

        // Act
        var result = await _tourService.GetTour(tourId, userId);

        // Assert
        Assert.That(result, Is.Not.Null);
        Assert.That(result.Id, Is.EqualTo(10));
    }

    [Test]
    public async Task GetTours_ReturnsListOfTours()
    {
        // Arrange
        int userId = 1;
        var toursFromDb = new List<Tour> { new Tour(), new Tour() };
        var expectedDtos = new List<TourDTO> 
        { 
            new TourDTO { Title = "T1", From = DummyLocation, To = DummyLocation, Type = "Hike" }, 
            new TourDTO { Title = "T2", From = DummyLocation, To = DummyLocation, Type = "Hike" } 
        };

        _tourRepoSub.GetAllTours(userId).Returns(Task.FromResult(toursFromDb));
        _mapperSub.Map<List<TourDTO>>(toursFromDb).Returns(expectedDtos);

        // Act
        var result = await _tourService.GetTours(userId);

        // Assert
        Assert.That(result.Count, Is.EqualTo(2));
    }

    [Test]
    public async Task ExportTours_ReturnsListOfTours()
    {
        // Arrange
        int userId = 1;
        var toursFromDb = new List<Tour> { new Tour() };
        var expectedDtos = new List<TourDTO> { new TourDTO { Title = "Export", From = DummyLocation, To = DummyLocation, Type = "Bike" } };

        _tourRepoSub.GetAllTours(userId).Returns(Task.FromResult(toursFromDb));
        _mapperSub.Map<List<TourDTO>>(toursFromDb).Returns(expectedDtos);

        // Act
        var result = await _tourService.ExportTours(userId);

        // Assert
        Assert.That(result.Count, Is.EqualTo(1));
    }

    [Test]
    public async Task UpdateTour_ValidData_SetsIdsAndReturnsDto()
    {
        // Arrange
        int userId = 3;
        int tourId = 7;
        var inputDto = new TourDTO { Title = "Update", From = DummyLocation, To = DummyLocation, Type = "Hike" };
        var mappedTour = new Tour { Id = 7, UserId = 3 };
        var outputDto = new TourDTO { Id = 7, Title = "Update", From = DummyLocation, To = DummyLocation, Type = "Hike" };

        _mapperSub.Map<Tour>(inputDto).Returns(mappedTour);
        _tourRepoSub.UpdateTour(mappedTour).Returns(Task.FromResult(mappedTour));
        _mapperSub.Map<TourDTO>(mappedTour).Returns(outputDto);

        // Act
        var result = await _tourService.UpdateTour(inputDto, tourId, userId);

        // Assert
        Assert.That(inputDto.Id, Is.EqualTo(7));
        Assert.That(inputDto.UserId, Is.EqualTo(3));
        Assert.That(result.Id, Is.EqualTo(7));
        await _tourRepoSub.Received(1).UpdateTour(mappedTour);
    }

    [Test]
    public async Task DeleteTour_CallsRepositoryDelete()
    {
        // Arrange
        int tourId = 4;
        int userId = 1;

        // Act
        await _tourService.DeleteTour(tourId, userId);

        // Assert
        await _tourRepoSub.Received(1).DeleteTour(tourId, userId);
    }

    [Test]
    public async Task ImportTours_ValidList_SetsIdsToNullAndCallsAdd()
    {
        // Arrange
        int userId = 5;
        var importList = new List<TourDTO> 
        { 
            new TourDTO { Id = 99, Title = "Import 1", From = DummyLocation, To = DummyLocation, Type = "Hike", Logs = new LogResponseDTO[] { new LogResponseDTO() } }, 
            new TourDTO { Id = 100, Title = "Import 2", From = DummyLocation, To = DummyLocation, Type = "Bike", Logs = new LogResponseDTO[] { new LogResponseDTO() } }
        };
        
        var mappedTour = new Tour();
        
        _mapperSub.Map<Tour>(Arg.Any<TourDTO>()).Returns(mappedTour);

        // Act
        await _tourService.ImportTours(importList, userId);

        // Assert
        Assert.That(importList[0].Id, Is.Null);
        Assert.That(importList[0].UserId, Is.EqualTo(5));
        Assert.That(importList[0].Logs[0].Id, Is.Null);
        
        Assert.That(importList[1].Id, Is.Null);
        Assert.That(importList[1].UserId, Is.EqualTo(5));
        Assert.That(importList[1].Logs[0].Id, Is.Null);

        await _tourRepoSub.Received(2).AddTour(Arg.Any<Tour>());
    }

    [Test]
    public async Task GetTour_NonExistingId_ReturnsNull()
    {
        // Arrange
        int userId = 1;
        int nonExistingTourId = 999;
        
        _tourRepoSub.GetTourById(userId, nonExistingTourId).Returns(Task.FromResult<Tour>(null));
        _mapperSub.Map<TourDTO>(null).Returns((TourDTO)null);

        // Act
        var result = await _tourService.GetTour(nonExistingTourId, userId);

        // Assert
        Assert.That(result, Is.Null);
    }

    [Test]
    public async Task GetTours_NoToursExist_ReturnsEmptyList()
    {
        // Arrange
        int userId = 1;
        var emptyListFromDb = new List<Tour>();
        var emptyDtoList = new List<TourDTO>();

        _tourRepoSub.GetAllTours(userId).Returns(Task.FromResult(emptyListFromDb));
        _mapperSub.Map<List<TourDTO>>(emptyListFromDb).Returns(emptyDtoList);

        // Act
        var result = await _tourService.GetTours(userId);

        // Assert
        Assert.That(result, Is.Not.Null);
        Assert.That(result, Is.Empty);
    }
}