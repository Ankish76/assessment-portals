import React from 'react'
import { RiskAssessmentType } from '../interfaces'
import moment from 'moment'

const ListingModal = ({ projectsAssessments, uniqueId }: { projectsAssessments: any, uniqueId: string }) => {
    return (
        <>
            <p className="text-[21px] py-4 font-semibold border-b px-4">
                Risk Assessment
            </p>
            <div className="pt-3 px-3 pb-8 mx-4">

                {projectsAssessments?.filter((i: RiskAssessmentType) => i.UniqueId === uniqueId).map((el: RiskAssessmentType) => {
                    return (
                        <div key={el.UniqueId}>
                            <div className='flex mt-4'>
                                <div className='text-black  text-lg font-semibold !basis-2/5'>
                                    Action Items :
                                </div>
                                <span className='font-normal ml-10' >{el.ActionItems}</span>
                            </div>
                            <div className='flex mt-4 items-center'>
                                <div className='text-black  text-lg font-semibold basis-2/5'>
                                    Category :
                                </div>
                                <span className='font-normal'>{el.Category}</span>
                            </div>
                            <div className='flex mt-4 items-center'>
                                <div className='text-black  text-lg font-semibold basis-2/5'>
                                    Risk Level :
                                </div>
                                <span className='font-normal'>{el.RiskLevel}</span>
                            </div>
                            <div className='flex mt-4 items-center'>
                                <div className='text-black  text-lg font-semibold basis-2/5'>
                                    Severity Level :
                                </div>
                                <span className='font-normal'>{el.SeverityLevel}</span>
                            </div>
                            <div className='flex mt-4 items-center'>
                                <div className='text-black  text-lg font-semibold basis-2/5'>
                                    Priority Level :
                                </div>
                                <span className='font-normal'>{el.PriorityLevel}</span>
                            </div>
                            <div className='flex mt-4 items-center'>
                                <div className='text-black  text-lg font-semibold basis-2/5'>
                                    Risk Descprition :
                                </div>
                                <span className='font-normal'>{el.RiskDesc}</span>
                            </div>
                            <div className='flex mt-4 items-center'>
                                <div className='text-black  text-lg font-semibold basis-2/5'>
                                    Mitigation :
                                </div>
                                <span className='font-normal'>{el.Mitigation}</span>
                            </div>
                            <div className='flex mt-4 items-center'>
                                <div className='text-black  text-lg font-semibold basis-2/5'>
                                    Action Items Owner :
                                </div>
                                <span className='font-normal'>{el.ActionItemsOwner}</span>
                            </div>
                            <div className='flex mt-4 items-center'>
                                <div className='text-black  text-lg font-semibold basis-2/5'>
                                    Resolved By User :
                                </div>
                                <span className='font-normal'>{el.ResolvedByUser}</span>
                            </div>
                            <div className='flex mt-4 items-center'>
                                <div className='text-black  text-lg font-semibold basis-2/5'>
                                    Created Date :
                                </div>
                                <span className='font-normal'>{el.CreatedDateTime
                                    ? moment(
                                        el.CreatedDateTime,
                                    ).format(
                                        "MM/DD/YYYY",
                                    )
                                    : null}</span>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default ListingModal