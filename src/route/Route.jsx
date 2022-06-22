import { BrowserRouter, Routes, Route } from "react-router-dom";

import Homepage from "../page/Homepage";
import Detail from "../page/Detail";

const RouteApp = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/Detail/:detail_id" element={<Detail />} />
            </Routes>    
        </BrowserRouter>
    )
}

export default RouteApp