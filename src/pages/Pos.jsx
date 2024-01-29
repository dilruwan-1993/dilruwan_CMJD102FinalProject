import TopNav from "../components/TopNav";
import Calculator from "../components/pos/Calculator";
import InvoiceConfirmation from "../components/pos/InvoiceConfirmation";
import PosTable from "../components/pos/PosTable";
import SearchProduct from "../components/pos/SearchProduct";

export default function POS() {
    return (
        <>

            <TopNav />
            <SearchProduct />
            <div className="grid sm:grid-cols-1 lg:grid-cols-4 gap-x-4 p-4">
                <div className="lg:col-span-3">
                    <PosTable />
                </div>
                <div className="lg:col-span-1">
                    <Calculator />
                </div>
            </div>
            <InvoiceConfirmation />

        </>
    );
}