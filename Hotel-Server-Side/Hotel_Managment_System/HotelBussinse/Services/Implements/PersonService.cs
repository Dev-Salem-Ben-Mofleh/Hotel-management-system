using AutoMapper;
using HotelBussinse.DTOs.DTOViews;
using HotelBussinse.DTOs.Persons;
using HotelBussinse.Global;
using HotelBussinse.Services.Interfaces;
using HotelDataAceess.Entiteis;
using HotelDataAceess.Repository.Implements;
using HotelDataAceess.Repository.Interfaces;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.ComponentModel.DataAnnotations;

namespace HotelBussinse.Services.Implements
{
    public class PersonService(IPersonRepository personRepository , IMapper mapper) : IPersonService
    {
        private readonly IPersonRepository _personRepository = personRepository;
        private readonly IMapper _mapper = mapper;

        public async Task<IEnumerable<PersonDto>> GetAllPersonAsync()
        {
            var Persons =await _personRepository.GetAllPersonAsync();
            
            if (Persons==null|| !Persons.Any())
            {
                return Enumerable.Empty<PersonDto>();
            }

            var PersonsDto =  _mapper.Map<IEnumerable<PersonDto>>(Persons);

            return PersonsDto;
        }

        public async Task<PersonDto> GetByIdAsync(int id)
        {
            var person = await personRepository.GetByIdAsync(id)
                ?? null;
            var personDto = _mapper.Map<PersonDto>(person);

            return personDto;

        }

        public async Task<PersonDto>AddAsync(CreateOrUpdatePersonDto personDto)
        {

                var NewPerson = _mapper.Map<Person>(personDto);
               var PersonDetails= await _personRepository.AddAsync(NewPerson);
                return _mapper.Map<PersonDto>(PersonDetails);
           
        }

        public async Task<PersonDto> UpdateAsync(int id, CreateOrUpdatePersonDto personDto)
        {
            
                var existingPerson = await _personRepository.GetByIdAsync(id);

                _mapper.Map(personDto, existingPerson);

                var PersonDetails=await _personRepository.UpdateAsync(id, existingPerson);
                return _mapper.Map<PersonDto>(PersonDetails);

           
        }

        public async Task<bool> DeleteAsync(int id)=> await _personRepository.DeleteAsync(id);
        public async Task<int> Count() => await _personRepository.Count();
        public async Task<bool> ExistsAsync(int id) => await _personRepository.ExistsAsync(id);
        public async Task<IEnumerable<PersonDto>> PagerPersonsUsingPageNumber(short pageNumber, int pageSize,string column,string value, string Operations )
        {
            var predicate = BuildMySearch<Person>.BuildPredicate(column, Operations, value);

            var Persons = await _personRepository.PagerPersonsUsingPageNumber(pageNumber, pageSize, predicate);
            return _mapper.Map<IEnumerable<PersonDto>>(Persons);
        }
        public async Task<PersonDto> GetPersonByNameAsync(string Name)
        {
            var person = await personRepository.GetPersonByNameAsync(Name)
                ?? null;
            var personDto = _mapper.Map<PersonDto>(person);

            return personDto;

        }

    }
}
