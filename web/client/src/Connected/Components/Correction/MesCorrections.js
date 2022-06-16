import { NavLink } from "react-router-dom"

function MesCorrections() {
    return (
        <div className="mes-corrections">
            <div className="title">TOUS LES QCM</div>
            <div className="tab-content">
                <div className="header-tab">
                    <label className="checkbox-container">
                        <input type="checkbox" />
                        <span className="checkbox-icon-checkmark"></span>
                    </label>
                    <div className="tab-title">Nom du QCM</div>
                    <div className="tab-title">Date du QCM</div>
                    <div className="tab-title">Moyenne Classe</div>
                    <div className="tab-title">Nom du groupe</div>
                    <div className="tab-title">Actions</div>
                </div>

                <div className="ligne-tab">
                    <label className="checkbox-container">
                        <input type="checkbox" />
                        <span className="checkbox-icon-checkmark"></span>
                    </label>
                    <div className="content-ligne-tab">QCM n°1</div>
                    <div className="content-ligne-tab">10/01/2022</div>
                    <div className="content-ligne-tab">13,5</div>
                    <div className="content-ligne-tab">INF1-A1</div>
                    <div className="container-actions">
                        <span className="icon-delete"></span>
                        <NavLink to="/liste-des-notes"><span className="icon-export"></span></NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MesCorrections;