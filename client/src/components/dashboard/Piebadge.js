import "./dashboard.css";

function PieBadge(props) {
    return (
        <div className="inline"><h3>  <span className="badge indicator text-white" style={{ backgroundColor: `${props.color}`, width: "150px" }}>{props.name}</span></h3></div >
    )
}
export default PieBadge;