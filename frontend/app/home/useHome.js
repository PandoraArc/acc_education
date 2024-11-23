import { useState, useEffect } from 'react';
import { grading } from '@/api/llm';

function useHome() {
    const [reason, setReason] = useState(null);
    const [score, setScore] = useState(null);
    const [isloading, setIsLoading] = useState(false);

    const analyze = async (val) => {
        setIsLoading(true);
        const response = await grading(val?.answer, val?.question);
        setScore(response?.score ?? "No score provided");
        setReason(response?.reason ?? "No reason provided");
        setIsLoading(false);
    }

    return {
        reason,
        score,
        isloading,
        setReason,
        setScore,
        analyze,
    };

}

export default useHome;