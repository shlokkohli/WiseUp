import { useState } from "react";
import { toast } from "./use-toast";

const useCronData = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const fetchDailyTotalData = async () => {
        setLoading(true);
        try {
            const body = await fetch('/api/fetch-weekly');
            const response = await body.json();
            return response.data;
        }
        catch (error: any) {
            toast({
                title: "Error",
                description: "Failed to fetch catrgory data",
                variant: "destructive"
            })
        }finally{
            setLoading(false);
        }
    }
    const categoriesData = async () => {
        setLoading(true);
        try {
            const body = await fetch('/api/fetch-weekly');
            const response = await body.json();
            return response.data;
        } catch (error) {
            toast({
                title : "Error",
                description : "Failed to fetch weekly total data",
                variant : "destructive"
            })
        }finally{
            setLoading(false);
        }
    }
    return {fetchDailyTotalData, categoriesData, loading}
}

    export default useCronData
