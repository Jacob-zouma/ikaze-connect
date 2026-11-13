import { createContext, useContext, useState, type ReactNode } from 'react';
import type { CartLine, DemoActivity, Listing, Profile } from '@/lib/domain';
interface DemoState { cart:CartLine[]; favorites:string[]; activities:DemoActivity[]; profile:Profile; addToCart:(item:Listing)=>void; setQuantity:(id:string,quantity:number)=>void; toggleFavorite:(id:string)=>void; addActivity:(type:string,title:string,amount?:number)=>void; updateProfile:(profile:Profile)=>void; clearCart:()=>void; }
const Context=createContext<DemoState | null>(null);
export function DemoProvider({children}:{children:ReactNode}) {
 const [cart,setCart]=useState<CartLine[]>([]); const [favorites,setFavorites]=useState<string[]>([]); const [activities,setActivities]=useState<DemoActivity[]>([]);
 const [profile,setProfile]=useState<Profile>({name:'Utilisateur Démo',email:'',phone:'',location:'Bujumbura',bio:'',role:'client'});
 const state:DemoState={cart,favorites,activities,profile,updateProfile:setProfile,
 addToCart:item=>setCart(old=>{const match=old.find(line=>line.listing.id===item.id);return match?old.map(line=>line.listing.id===item.id?{...line,quantity:Math.min(line.quantity+1,item.stock??99)}:line):[...old,{listing:item,quantity:1}];}),
 setQuantity:(id,quantity)=>setCart(old=>old.flatMap(line=>line.listing.id!==id?[line]:quantity<=0?[]:[{...line,quantity:Math.min(quantity,line.listing.stock??99)}])),
 toggleFavorite:id=>setFavorites(old=>old.includes(id)?old.filter(value=>value!==id):[...old,id]),
 addActivity:(type,title,amount)=>setActivities(old=>[{id:crypto.randomUUID(),type,title,status:'Brouillon démo',date:new Date().toLocaleDateString('fr-FR'),amount},...old]),clearCart:()=>setCart([])};
 return <Context.Provider value={state}>{children}</Context.Provider>;
}
export function useDemo(){const value=useContext(Context);if(!value)throw new Error('DemoProvider is required');return value;}
