import { useNavigate } from "react-router-dom";

function CompanyCard({ company }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/${company.id}`)}
      style={{
        border: "1px solid gray",
        padding: "10px",
        margin: "10px",
        cursor: "pointer",
      }}
    >
      <h2>{company.name}</h2>
      <p>{company.type}</p>
    </div>
  );
}

export default CompanyCard;
