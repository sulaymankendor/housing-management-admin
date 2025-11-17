"use client";
import TenantsExpenseTables from "@/components/landlord/TenantsExpenseTables";
import StatCard from "@/components/reuseables/StatCard";
import ChargeExtraMoneyIcon from "@/components/svgs/ChargeExtraMoneyIcon";
import CorpInterestExpensesIcon from "@/components/svgs/CorpInterestExpensesIcon";
import SalesAmountIcon from "@/components/svgs/SalesAmountIcon";
import ScopeExpenseClaimsIcon from "@/components/svgs/ScopeExpenseClaimsIcon";
import { axisoRequest } from "@/lib/axiosRequest";
import { formatPrice } from "@/lib/formatPrice";
import {
  searchDepositeExpenses,
  searchLanlordExpenses,
  searchTenants,
} from "@/lib/searchFunctions";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function Page() {
  const params = useParams();
  const [tableToShow, setTableToShow] = useState("tenant");
  const [searchText, setSearchText] = useState("");

  const [landlordStats, setLandlordStats] = useState([
    {
      id: 1,
      title: "Total Revenue",
      stat: "D0",
      icon: SalesAmountIcon,
    },
    {
      id: 2,
      title: "Expenses",
      stat: `D${formatPrice(0)}`,
      icon: ScopeExpenseClaimsIcon,
    },
    {
      id: 3,
      title: "Charged",
      stat: `D${formatPrice(0)}`,
      icon: ChargeExtraMoneyIcon,
    },
    {
      id: 4,
      title: "Uncharged",
      stat: `D${formatPrice(0)}`,
      icon: CorpInterestExpensesIcon,
    },
  ]);

  const [tenants, setTenants] = useState({
    tenants: [],
    searchedTenants: [],
  });

  const [tenantsRequest, setTenantsRequest] = useState({
    isLoading: true,
    axiosRequestError: "",
  });
  const [landlordExpenses, setLandlordExpenses] = useState({
    landlordExpenses: [],
    searchedLandlordExpenses: [],
  });
  const [landlordExpensesRequest, setLandlordExpensesRequest] = useState({
    isLoading: true,
    axiosRequestError: "",
  });
  const [depositeExpenses, setDepositeExpenses] = useState({
    depositeExpenses: [],
    searchedDepositeExpenses: [],
  });
  const [depositeExpensesRequest, setDepositeExpensesRequest] = useState({
    isLoading: true,
    axiosRequestError: "",
  });

  useEffect(() => {
    const fetchTenantsAndExpenses = async () => {
      //tenants
      const fetchedTenants = await axisoRequest.getBasedOnID(
        "tenants",
        setTenantsRequest,
        //@ts-ignore
        params["landlord-id"],
        "landlordID"
      );
      setTenants({ tenants: fetchedTenants, searchedTenants: fetchedTenants });
      const fetchedLandlordExpenses = await axisoRequest.getBasedOnID(
        "landlordExpenses",
        setLandlordExpensesRequest,
        //@ts-ignore
        params["landlord-id"],
        "landlordID"
      );

      setLandlordExpenses({
        landlordExpenses: fetchedLandlordExpenses,
        searchedLandlordExpenses: fetchedLandlordExpenses,
      });

      const fetchedDepositeExpenses = await axisoRequest.getBasedOnID(
        "depositeExpenses",
        setDepositeExpensesRequest,
        //@ts-ignore
        params["landlord-id"],
        "landlordID"
      );
      setDepositeExpenses({
        depositeExpenses: fetchedDepositeExpenses,
        searchedDepositeExpenses: fetchedDepositeExpenses,
      });
    };

    fetchTenantsAndExpenses();
  }, []);

  useEffect(() => {
    if (tableToShow === "tenant") {
      if (searchText !== "") {
        searchTenants(tenants?.tenants, setTenants, searchText);
      } else if (tenants?.tenants?.length > 0 && searchText === "") {
        setTenants((prevTenantsState) => {
          return { ...prevTenantsState, searchedTenants: tenants.tenants };
        });
      }
    } else if (tableToShow === "landlord expense") {
      if (searchText !== "") {
        searchLanlordExpenses(
          landlordExpenses.landlordExpenses,
          setLandlordExpenses,
          searchText
        );
      } else if (
        landlordExpenses.landlordExpenses.length > 0 &&
        searchText === ""
      ) {
        setLandlordExpenses((prevLandlordExpensesState) => {
          return {
            ...prevLandlordExpensesState,
            searchedLandlordExpenses: landlordExpenses.landlordExpenses,
          };
        });
      }
    } else if (tableToShow === "deposite expense") {
      if (searchText !== "") {
        searchDepositeExpenses(
          depositeExpenses.depositeExpenses,
          setDepositeExpenses,
          searchText
        );
      } else if (
        depositeExpenses.depositeExpenses.length > 0 &&
        searchText === ""
      ) {
        setDepositeExpenses((prevDepositeExpensesState) => {
          return {
            ...prevDepositeExpensesState,
            searchedDepositeExpenses: depositeExpenses.depositeExpenses,
          };
        });
      }
    }
  }, [searchText, tableToShow]);

  useEffect(() => {
    let totalExpenses = 0;
    let charged = 0;
    let uncharged = 0;
    landlordExpenses?.landlordExpenses?.forEach((expense: any) => {
      totalExpenses += Number(expense.totalAmount);
      if (Number(expense.amountDue) > 0) {
        uncharged += Number(expense.amountDue);
      } else {
        charged += Number(expense.amountPaid);
      }
    });

    setLandlordStats([
      {
        id: 1,
        title: "Total Revenue",
        stat: "D200",
        icon: SalesAmountIcon,
      },
      {
        id: 2,
        title: "Expenses",
        stat: `D${formatPrice(totalExpenses)}`,
        icon: ScopeExpenseClaimsIcon,
      },
      {
        id: 3,
        title: "Charged",
        stat: `D${formatPrice(charged)}`,
        icon: ChargeExtraMoneyIcon,
      },
      {
        id: 4,
        title: "Uncharged",
        stat: `D${formatPrice(uncharged)}`,

        icon: CorpInterestExpensesIcon,
      },
    ]);
  }, [landlordExpenses.landlordExpenses]);
  return (
    <section>
      <div className="grid grid-cols-4 gap-5">
        {landlordStats.map((stat) => {
          return (
            <StatCard
              key={stat.id}
              icon={<stat.icon />}
              title={stat.title}
              stat={stat.stat}
            />
          );
        })}
      </div>
      <TenantsExpenseTables
        tableToShow={tableToShow}
        setTableToShow={setTableToShow}
        searchText={searchText}
        setSearchText={setSearchText}
        landlordExpenses={landlordExpenses.searchedLandlordExpenses}
        landlordExpensesRequest={landlordExpensesRequest}
        depositeExpenses={depositeExpenses.searchedDepositeExpenses}
        depositeExpensesRequest={depositeExpensesRequest}
        tenants={tenants.searchedTenants}
        tenantsRequest={tenantsRequest}
      />
    </section>
  );
}

export default Page;
