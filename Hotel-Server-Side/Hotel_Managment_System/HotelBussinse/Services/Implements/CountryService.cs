using AutoMapper;
using HotelBussinse.DTOs.Countries;
using HotelBussinse.DTOs.Persons;
using HotelBussinse.Services.Interfaces;
using HotelDataAceess.Entiteis;
using HotelDataAceess.Repository.Implements;
using HotelDataAceess.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HotelBussinse.Services.Implements
{
    public class CountryService(ICountryRepositry countryRepository, IMapper mapper) : ICountryService
    {
        private readonly ICountryRepositry _countryRepository = countryRepository;
        private readonly IMapper _mapper = mapper;

        public async Task<IEnumerable<CountryDto>> GetAllAsync()
        {
            var Countries = await _countryRepository.GetAllAsync();

            if (Countries == null || !Countries.Any())
            {
                return Enumerable.Empty<CountryDto>();
            }
            var CountriesDto = _mapper.Map<IEnumerable<CountryDto>>(Countries);
            return CountriesDto;
        }

        public async Task<CountryDto> GetByIdAsync(int id)
        {
            var Country = await _countryRepository.GetByIdAsync(id)
                ?? null;
            var CountryDto = _mapper.Map<CountryDto>(Country);

            return CountryDto;

        }

        public async Task<CountryDto> AddAsync(CreateOrUpdateCountryDto countryDto)
        {
                var NewCountry = _mapper.Map<Country>(countryDto);
                var CountryDetails = await _countryRepository.AddAsync(NewCountry);
                return _mapper.Map<CountryDto>(CountryDetails);


        }

        public async Task<CountryDto> UpdateAsync(int id, CreateOrUpdateCountryDto countryDto)
        {

                var existingCountry = await _countryRepository.GetByIdAsync(id);

                _mapper.Map(countryDto, existingCountry);

                var CountryDetails = await _countryRepository.UpdateAsync(id, existingCountry);
                return _mapper.Map<CountryDto>(CountryDetails);



        }
        public async Task<bool> DeleteAsync(int id) => await _countryRepository.DeleteAsync(id);
        public async Task<int> Count() => await _countryRepository.Count();
        public async Task<bool> ExistsAsync(int id) => await _countryRepository.ExistsAsync(id);
    }
}
