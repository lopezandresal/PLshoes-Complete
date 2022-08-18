import '../css/spinner.css';
import { Spinner } from 'reactstrap';

export function SpinnerLoading(params) {
    return (
        <div className="spinnerDiv">
            <Spinner color='primary' />
        </div>
    )
};
