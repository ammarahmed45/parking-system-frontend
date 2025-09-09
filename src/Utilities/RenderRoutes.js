import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginComponent from "../Components/Log/LoginComponent";
import Home from "../Components/Home/Home";
import { AuthData } from "./Protected";
import AdminDashboard from "../Components/Admin/AdminDashboard";
import SubscriptionsPage from "../Components/Admin/Sub/SubscriptionsPage";
import Gates from "../Components/Gates/Gates";
import Gateid from "../Components/Gates/Gateid";
import Zones from "../Components/Zones/Zones";
import TicketsPage from "../Components/Tickets/TicketsPage";
import CheckpointPage from "../Components/CheckPoint/CheckpointPage";
import ParkingReports from "../Components/Admin/Reports/ParkingReports";
import RushHoursPage from "../Components/Admin/Rush/RushHoursPage";
import VacationForm from "../Components/Admin/Vacation/VacationForm";
import CategoryRatesPage from "../Components/Admin/Update/CategoryRatesPage";
import ZoneTogglePage from "../Components/Admin/Update/ZoneTogglePage";

const RenderRoutes = () => {
  const { loggedUser } = AuthData();
  console.log(loggedUser);

  return (
    <Routes>
      {loggedUser.isAuth ? (
        loggedUser.user?.role === "employee" ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/gates" element={<Gates />} />
            <Route path="gates/:gateId" element={<Gateid />} />
            <Route path="/zones" element={<Zones />} />
            <Route path="/tickets" element={<TicketsPage />} />
            <Route path="/checkpoint" element={<CheckpointPage />} />
          </>
        ) : (
          <>
            <Route path="/" element={<AdminDashboard />} />
            <Route path="/subscription" element={<SubscriptionsPage />} />
            <Route path="/reports" element={<ParkingReports />} />
            <Route path="/rush-hours" element={<RushHoursPage />} />
            <Route path="/vacations" element={<VacationForm />} />
            <Route path="/update-categories" element={<CategoryRatesPage />} />
            <Route path="/zones-edit" element={<ZoneTogglePage />} />
          </>
        )
      ) : (
        <>
          <Route path="*" element={<LoginComponent />} />
        </>
      )}
    </Routes>
  );
};

export default RenderRoutes;
