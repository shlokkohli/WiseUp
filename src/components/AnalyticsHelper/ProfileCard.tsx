import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Image from "next/image";
import { Wallet } from "lucide-react";
import { statsResponse } from "@/types/stats.type";
import { BsStars } from "react-icons/bs";
import Link from "next/link";

export default function ProfileCard({ data, loading }: { data: statsResponse | null, loading: boolean }) {
   const { user } = useUser();
   let categoryMax: string = "", methodMax: string = "";
   let categoryMaxAmount = 0, methodMaxAmount = 0;
   let maxi = 0;
   const categoryArray = data?.categoryDivisions || [];
   for (let i = 0; i < categoryArray.length; i++) {
      const amount = categoryArray[i]._sum.amount;
      const category = categoryArray[i].category;
      if (amount && amount >= maxi) {
         categoryMax = category;
         maxi = amount;
      }
   }
   categoryMaxAmount = maxi;
   maxi = 0;
   const paymentArray = data?.paymentMethodDivisions || [];
   for (let i = 0; i < paymentArray.length; i++) {
      const amount = paymentArray[i]._sum.amount;
      const method = paymentArray[i].paymentMethod;
      if (amount && amount >= maxi) {
         methodMax = method;
         maxi = amount;
      }
   }
   methodMaxAmount = maxi;

   return (
      <div className="bg-gray-100 flex flex-col gap-2 h-full rounded-lg p-2">
         <div className="ProfileSection bg-white/90 rounded-lg flex items-center h-auto">
            <Avatar className="w-20 h-20 m-5">
               <AvatarImage src="https://avatar.iran.liara.run/public/boy" alt="@shadcn" />
               <AvatarFallback><Image alt="user" src="/DefaultAvatar.png" height={100} width={100} /></AvatarFallback>
            </Avatar>
            <div>
               <div className="text-sm">
                  <p className="text-gray-900 break-all">{user?.primaryEmailAddress?.emailAddress}</p>
               </div>
               <div className="text-sm">
                  <label className="text-gray-600 font-semibold" htmlFor="">Member Since</label>
                  <p className="text-gray-900">{user?.createdAt
                     ? new Date(user.createdAt).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                     })
                     : "No date available"}
                  </p>
               </div>
            </div>
         </div>
         <div className="bg-white p-5 rounded-lg">
            <p className="flex items-center gap-2 text-lg font-semibold text-gray-600">
               <Wallet className="text-violet-600" />
               Total Amount Recorded
            </p>
            <p className="w-full py-3 text-2xl font-semibold text-violet-600 text-center">
               ₹ {data?.totalAmount._sum.amount || 0}
            </p>
         </div>
         <div className="bg-white p-5 rounded-lg">
            <MaxContainer title="Category Maximum" subTitle={categoryMax} amount={categoryMaxAmount} />
            <MaxContainer title="Method Maximum" subTitle={methodMax} amount={methodMaxAmount} />
         </div>
         <div className="bg-white p-5 rounded-lg">
            <h3 className="flex items-center gap-4 text-xl font-semibold text-gray-700"> <span><BsStars className="text-violet-600"/> </span>Smart Analysis</h3>
            <p className="py-1">Optimize your spending with our detailed AI analysis. </p>
            <Link href='/ai-analysis' className="bg-violet-500 rounded-md text-white py-1 px-4 my-4 w-fit flex items-center gap-2"><span><BsStars/> </span>Analyze</Link>
         </div>
      </div>
   );
}

const MaxContainer = ({title, subTitle, amount} : 
   {
      title : string,
      subTitle : string,
      amount : number

   }) => {
   return (
      <>
         <p className="text-lg font-semibold text-gray-600">
            {title}
         </p>
         <div className="flex text-sm my-3 gap-5 justify-between items-center">
            <p className="w-full font-semibold text-gray-600">
               {subTitle || "NA"}
            </p>
            <p className="w-full font-semibold text-violet-600">
               ₹{amount || 0}
            </p>
         </div>
      </>
   )
}