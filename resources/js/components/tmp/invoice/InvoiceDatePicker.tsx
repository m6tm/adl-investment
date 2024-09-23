import React from "react";


export default class InvoiceDatePicker extends React.Component {
        props!: Readonly<{ id: string }>;

        constructor(props: Readonly<{}>) {
                super(props)
        }

        render(): React.ReactNode {
            return (
                <div className="picker" id={this.props.id} aria-hidden="true">
                        <div className="picker__holder" tabIndex={-1}>
                                <div className="picker__frame">
                                        <div className="picker__wrap">
                                                <div className="picker__box">
                                                        <div className="picker__header">
                                                                <div className="picker__month">December</div>
                                                                <div className="picker__year">2022</div>
                                                                <div className="picker__nav--prev" data-nav="-1" role="button" aria-controls="date_issue_table" title="Previous month"> </div>
                                                                <div className="picker__nav--next" data-nav="1" role="button" aria-controls="date_issue_table" title="Next month"> </div>
                                                        </div>
                                                        <table className="picker__table" id="date_issue_table" role="grid" aria-controls="date_issue" aria-readonly="true">
                                                                <thead>
                                                                        <tr>
                                                                                <th className="picker__weekday" scope="col" title="Sunday">Sun</th>
                                                                                <th className="picker__weekday" scope="col" title="Monday">Mon</th>
                                                                                <th className="picker__weekday" scope="col" title="Tuesday">Tue</th>
                                                                                <th className="picker__weekday" scope="col" title="Wednesday">Wed</th>
                                                                                <th className="picker__weekday" scope="col" title="Thursday">Thu</th>
                                                                                <th className="picker__weekday" scope="col" title="Friday">Fri</th>
                                                                                <th className="picker__weekday" scope="col" title="Saturday">Sat</th>
                                                                        </tr>
                                                                </thead>
                                                                <tbody>
                                                                        <tr>
                                                                                <td role="presentation">
                                                                                        <div className="picker__day picker__day--outfocus" data-pick="1669503600000" role="gridcell" aria-label="11/27/2022">27</div>
                                                                                </td>
                                                                                <td role="presentation">
                                                                                        <div className="picker__day picker__day--outfocus" data-pick="1669590000000" role="gridcell" aria-label="11/28/2022">28</div>
                                                                                </td>
                                                                                <td role="presentation">
                                                                                        <div className="picker__day picker__day--outfocus" data-pick="1669676400000" role="gridcell" aria-label="11/29/2022">29</div>
                                                                                </td>
                                                                                <td role="presentation">
                                                                                        <div className="picker__day picker__day--outfocus" data-pick="1669762800000" role="gridcell" aria-label="11/30/2022">30</div>
                                                                                </td>
                                                                                <td role="presentation">
                                                                                        <div className="picker__day picker__day--infocus" data-pick="1669849200000" role="gridcell" aria-label="12/01/2022">1</div>
                                                                                </td>
                                                                                <td role="presentation">
                                                                                        <div className="picker__day picker__day--infocus" data-pick="1669935600000" role="gridcell" aria-label="12/02/2022">2</div>
                                                                                </td>
                                                                                <td role="presentation">
                                                                                        <div className="picker__day picker__day--infocus" data-pick="1670022000000" role="gridcell" aria-label="12/03/2022">3</div>
                                                                                </td>
                                                                        </tr>
                                                                        <tr>
                                                                                <td role="presentation">
                                                                                        <div className="picker__day picker__day--infocus" data-pick="1670108400000" role="gridcell" aria-label="12/04/2022">4</div>
                                                                                </td>
                                                                                <td role="presentation">
                                                                                        <div className="picker__day picker__day--infocus" data-pick="1670194800000" role="gridcell" aria-label="12/05/2022">5</div>
                                                                                </td>
                                                                                <td role="presentation">
                                                                                        <div className="picker__day picker__day--infocus" data-pick="1670281200000" role="gridcell" aria-label="12/06/2022">6</div>
                                                                                </td>
                                                                                <td role="presentation">
                                                                                        <div className="picker__day picker__day--infocus" data-pick="1670367600000" role="gridcell" aria-label="12/07/2022">7</div>
                                                                                </td>
                                                                                <td role="presentation">
                                                                                        <div className="picker__day picker__day--infocus" data-pick="1670454000000" role="gridcell" aria-label="12/08/2022">8</div>
                                                                                </td>
                                                                                <td role="presentation">
                                                                                        <div className="picker__day picker__day--infocus" data-pick="1670540400000" role="gridcell" aria-label="12/09/2022">9</div>
                                                                                </td>
                                                                                <td role="presentation">
                                                                                        <div className="picker__day picker__day--infocus" data-pick="1670626800000" role="gridcell" aria-label="12/10/2022">10</div>
                                                                                </td>
                                                                        </tr>
                                                                        <tr>
                                                                                <td role="presentation">
                                                                                        <div className="picker__day picker__day--infocus" data-pick="1670713200000" role="gridcell" aria-label="12/11/2022">11</div>
                                                                                </td>
                                                                                <td role="presentation">
                                                                                        <div className="picker__day picker__day--infocus" data-pick="1670799600000" role="gridcell" aria-label="12/12/2022">12</div>
                                                                                </td>
                                                                                <td role="presentation">
                                                                                        <div className="picker__day picker__day--infocus" data-pick="1670886000000" role="gridcell" aria-label="12/13/2022">13</div>
                                                                                </td>
                                                                                <td role="presentation">
                                                                                        <div className="picker__day picker__day--infocus" data-pick="1670972400000" role="gridcell" aria-label="12/14/2022">14</div>
                                                                                </td>
                                                                                <td role="presentation">
                                                                                        <div className="picker__day picker__day--infocus" data-pick="1671058800000" role="gridcell" aria-label="12/15/2022">15</div>
                                                                                </td>
                                                                                <td role="presentation">
                                                                                        <div className="picker__day picker__day--infocus" data-pick="1671145200000" role="gridcell" aria-label="12/16/2022">16</div>
                                                                                </td>
                                                                                <td role="presentation">
                                                                                        <div className="picker__day picker__day--infocus" data-pick="1671231600000" role="gridcell" aria-label="12/17/2022">17</div>
                                                                                </td>
                                                                        </tr>
                                                                        <tr>
                                                                                <td role="presentation">
                                                                                        <div className="picker__day picker__day--infocus" data-pick="1671318000000" role="gridcell" aria-label="12/18/2022">18</div>
                                                                                </td>
                                                                                <td role="presentation">
                                                                                        <div className="picker__day picker__day--infocus" data-pick="1671404400000" role="gridcell" aria-label="12/19/2022">19</div>
                                                                                </td>
                                                                                <td role="presentation">
                                                                                        <div className="picker__day picker__day--infocus" data-pick="1671490800000" role="gridcell" aria-label="12/20/2022">20</div>
                                                                                </td>
                                                                                <td role="presentation">
                                                                                        <div className="picker__day picker__day--infocus" data-pick="1671577200000" role="gridcell" aria-label="12/21/2022">21</div>
                                                                                </td>
                                                                                <td role="presentation">
                                                                                        <div className="picker__day picker__day--infocus" data-pick="1671663600000" role="gridcell" aria-label="12/22/2022">22</div>
                                                                                </td>
                                                                                <td role="presentation">
                                                                                        <div className="picker__day picker__day--infocus" data-pick="1671750000000" role="gridcell" aria-label="12/23/2022">23</div>
                                                                                </td>
                                                                                <td role="presentation">
                                                                                        <div className="picker__day picker__day--infocus" data-pick="1671836400000" role="gridcell" aria-label="12/24/2022">24</div>
                                                                                </td>
                                                                        </tr>
                                                                        <tr>
                                                                                <td role="presentation">
                                                                                        <div className="picker__day picker__day--infocus" data-pick="1671922800000" role="gridcell" aria-label="12/25/2022">25</div>
                                                                                </td>
                                                                                <td role="presentation">
                                                                                        <div className="picker__day picker__day--infocus picker__day--today picker__day--highlighted" data-pick="1672009200000" role="gridcell" aria-label="12/26/2022" aria-activedescendant="true">26</div>
                                                                                </td>
                                                                                <td role="presentation">
                                                                                        <div className="picker__day picker__day--infocus" data-pick="1672095600000" role="gridcell" aria-label="12/27/2022">27</div>
                                                                                </td>
                                                                                <td role="presentation">
                                                                                        <div className="picker__day picker__day--infocus" data-pick="1672182000000" role="gridcell" aria-label="12/28/2022">28</div>
                                                                                </td>
                                                                                <td role="presentation">
                                                                                        <div className="picker__day picker__day--infocus" data-pick="1672268400000" role="gridcell" aria-label="12/29/2022">29</div>
                                                                                </td>
                                                                                <td role="presentation">
                                                                                        <div className="picker__day picker__day--infocus" data-pick="1672354800000" role="gridcell" aria-label="12/30/2022">30</div>
                                                                                </td>
                                                                                <td role="presentation">
                                                                                        <div className="picker__day picker__day--infocus" data-pick="1672441200000" role="gridcell" aria-label="12/31/2022">31</div>
                                                                                </td>
                                                                        </tr>
                                                                        <tr>
                                                                                <td role="presentation">
                                                                                        <div className="picker__day picker__day--outfocus" data-pick="1672527600000" role="gridcell" aria-label="01/01/2023">1</div>
                                                                                </td>
                                                                                <td role="presentation">
                                                                                        <div className="picker__day picker__day--outfocus" data-pick="1672614000000" role="gridcell" aria-label="01/02/2023">2</div>
                                                                                </td>
                                                                                <td role="presentation">
                                                                                        <div className="picker__day picker__day--outfocus" data-pick="1672700400000" role="gridcell" aria-label="01/03/2023">3</div>
                                                                                </td>
                                                                                <td role="presentation">
                                                                                        <div className="picker__day picker__day--outfocus" data-pick="1672786800000" role="gridcell" aria-label="01/04/2023">4</div>
                                                                                </td>
                                                                                <td role="presentation">
                                                                                        <div className="picker__day picker__day--outfocus" data-pick="1672873200000" role="gridcell" aria-label="01/05/2023">5</div>
                                                                                </td>
                                                                                <td role="presentation">
                                                                                        <div className="picker__day picker__day--outfocus" data-pick="1672959600000" role="gridcell" aria-label="01/06/2023">6</div>
                                                                                </td>
                                                                                <td role="presentation">
                                                                                        <div className="picker__day picker__day--outfocus" data-pick="1673046000000" role="gridcell" aria-label="01/07/2023">7</div>
                                                                                </td>
                                                                        </tr>
                                                                </tbody>
                                                        </table>
                                                        <div className="picker__footer">
                                                                <button className="picker__button--today" type="button" data-pick="1672009200000" disabled aria-controls="date_issue">Today</button>
                                                                <button className="picker__button--clear" type="button" data-clear="1" disabled aria-controls="date_issue">Clear</button>
                                                                <button className="picker__button--close" type="button" data-close="true" disabled aria-controls="date_issue">Close</button>
                                                        </div>
                                                </div>
                                        </div>
                                </div>
                        </div>
                </div>
            )
        }
}