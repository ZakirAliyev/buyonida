import './index.scss';
import { PulseLoader } from "react-spinners";

function AdminAreYouSure({ onCancel, onRefund, isRefunding }) {
    return (
        <section id="adminAreYouSure">
            <h2>Are you sure to refund?</h2>
            <div className="ending">
                <button className="btnbtntb" onClick={onCancel} disabled={isRefunding}>
                    Cancel
                </button>
                <button
                    className="btn-done"
                    onClick={onRefund}
                    disabled={isRefunding}
                >
                    {isRefunding ? (
                        <PulseLoader color={"white"} size={10} />
                    ) : (
                        "Refund"
                    )}
                </button>
            </div>
        </section>
    );
}

export default AdminAreYouSure;