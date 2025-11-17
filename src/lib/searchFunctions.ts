export function searchLandlords(landlords, setLandlords, searchText) {
  const filteredLandlords = landlords.filter((landlord) => {
    return (
      landlord.landlordID.includes(searchText) ||
      landlord.name.toLowerCase().includes(searchText.toLowerCase()) ||
      landlord.phoneNumber.includes(searchText.toLowerCase()) ||
      landlord.propertyLocation.some((location) =>
        location.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  });
  setLandlords((prevLandlordsState) => {
    return { ...prevLandlordsState, searchedLanlords: filteredLandlords };
  });
}

export function searchTenants(tenants, setTenants, searchText) {
  const filteredTenants = tenants.filter((tenant) => {
    return (
      tenant.tenantID.includes(searchText) ||
      tenant.name.toLowerCase().includes(searchText.toLowerCase()) ||
      tenant.phoneNumber.includes(searchText.toLowerCase()) ||
      tenant.propertyLocation.toLowerCase().includes(searchText.toLowerCase())
    );
  });
  setTenants((prevTenantsState) => {
    return { ...prevTenantsState, searchedTenants: filteredTenants };
  });
}

export function searchLanlordExpenses(
  landlordExpenses,
  setLandlordExpenses,
  searchText
) {
  const filteredLandlordExpenses = landlordExpenses.filter(
    (landlordExpense) => {
      return (
        landlordExpense.tenantName
          .toLowerCase()
          .includes(searchText.toLowerCase()) ||
        landlordExpense.propertyLocation
          .toLowerCase()
          .includes(searchText.toLowerCase())
      );
    }
  );
  setLandlordExpenses((prevLandlordExpensesState) => {
    return {
      ...prevLandlordExpensesState,
      searchedLandlordExpenses: filteredLandlordExpenses,
    };
  });
}

export function searchDepositeExpenses(
  depositeExpenses,
  setDepositeExpenses,
  searchText
) {
  const filteredDepositeExpenses = depositeExpenses.filter(
    (depositeExpense) => {
      return (
        depositeExpense.tenantName
          .toLowerCase()
          .includes(searchText.toLowerCase()) ||
        depositeExpense.propertyLocation
          .toLowerCase()
          .includes(searchText.toLowerCase())
      );
    }
  );
  setDepositeExpenses((prevDepositeExpensesState) => {
    return {
      ...prevDepositeExpensesState,
      searchedDepositeExpenses: filteredDepositeExpenses,
    };
  });
}

export function searchExpenditures(expenditures, setExpenditures, searchText) {
  const filteredExpenditures = expenditures.filter((expenditure) => {
    return (
      expenditure.expenseBy.toLowerCase().includes(searchText.toLowerCase()) ||
      expenditure.paymentMethod.toLowerCase().includes(searchText.toLowerCase())
    );
  });
  setExpenditures((prevExpendituresState) => {
    return {
      ...prevExpendituresState,
      searchedExpenditures: filteredExpenditures,
    };
  });
}
