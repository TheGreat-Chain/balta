function MesQCM() {
    return (
        <div className="mes-qcm">
            <div className="title">TOUS LES QCM</div>

            {/* <a className="primary-button">NOUVEAU QCM<span className="icon-edit"></span></a> */}

            <div className="tab-content">
                <div className="header-tab">
                    <label className="checkbox-container">
                        <input type="checkbox" />
                        <span className="checkbox-icon-checkmark"></span>
                    </label>
                    <div className="tab-title">Nom du QCM</div>
                    <div className="tab-title">Nombre de questions</div>
                    <div className="tab-title">Etat</div>
                    <div className="tab-title">Moyenne classe dernière éval</div>
                    <div className="tab-title">Actions</div>
                </div>

                <div className="ligne-tab">
                    <label className="checkbox-container">
                        <input type="checkbox" />
                        <span className="checkbox-icon-checkmark"></span>
                    </label>
                    <div className="content-ligne-tab">QCM n°1</div>
                    <div className="content-ligne-tab">10</div>
                    <div className="content-ligne-tab">Non corrigé</div>
                    <div className="content-ligne-tab">-</div>
                    <div className="container-actions">
                        <span className="icon-delete"></span>
                        <span className="icon-edit"></span>
                        <span className="icon-export"></span>
                    </div>
                </div>

                <div className="ligne-tab">
                    <label className="checkbox-container">
                        <input type="checkbox" />
                        <span className="checkbox-icon-checkmark"></span>
                    </label>
                    <div className="content-ligne-tab">QCM n°2</div>
                    <div className="content-ligne-tab">10</div>
                    <div className="content-ligne-tab">Non corrigé</div>
                    <div className="content-ligne-tab">-</div>
                    <div className="container-actions">
                        <span className="icon-delete"></span>
                        <span className="icon-edit"></span>
                        <span className="icon-export"></span>
                    </div>
                </div>

                <div className="ligne-tab">
                    <label className="checkbox-container">
                        <input type="checkbox" />
                        <span className="checkbox-icon-checkmark"></span>
                    </label>
                    <div className="content-ligne-tab">QCM n°3</div>
                    <div className="content-ligne-tab">10</div>
                    <div className="content-ligne-tab">Corrigé</div>
                    <div className="content-ligne-tab">13.5</div>
                    <div className="container-actions">
                        <span className="icon-delete"></span>
                        <span className="icon-edit"></span>
                        <span className="icon-export"></span>
                    </div>
                </div>

                <div className="ligne-tab">
                    <label className="checkbox-container">
                        <input type="checkbox" />
                        <span className="checkbox-icon-checkmark"></span>
                    </label>
                    <div className="content-ligne-tab">QCM n°4</div>
                    <div className="content-ligne-tab">10</div>
                    <div className="content-ligne-tab">Non corrigé</div>
                    <div className="content-ligne-tab">-</div>
                    <div className="container-actions">
                        <span className="icon-delete"></span>
                        <span className="icon-edit"></span>
                        <span className="icon-export"></span>
                    </div>
                </div>

                <div className="ligne-tab">
                    <label className="checkbox-container">
                        <input type="checkbox" />
                        <span className="checkbox-icon-checkmark"></span>
                    </label>
                    <div className="content-ligne-tab">QCM n°5</div>
                    <div className="content-ligne-tab">10</div>
                    <div className="content-ligne-tab">Corrigé</div>
                    <div className="content-ligne-tab">14</div>
                    <div className="container-actions">
                        <span className="icon-delete"></span>
                        <span className="icon-edit"></span>
                        <span className="icon-export"></span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MesQCM;