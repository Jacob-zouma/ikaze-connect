import { describe,it,expect } from 'vitest';
import { filterListings, listings, modules } from '@/lib/demo-data';
import { money } from '@/lib/domain';
import { apiRequest, ApiError } from '@/lib/api/client';
describe('IKAZE domain rules',()=>{
 it('has all eight modules',()=>expect(modules.map(m=>m.key)).toEqual(['services','market','jobs','digital','delivery','classifieds','business','student']));
 it('prices use BIF',()=>expect(money(25000)).toMatch(/25\s000 BIF/));
 it('jobs are explicitly fictitious instead of real opportunities',()=>expect(listings.filter(l=>l.module==='jobs').every(l=>/fictiv|fictif/i.test(l.description))).toBe(true));
 it('filters service categories independently',()=>expect(filterListings('services','','Électricité').map(l=>l.id)).toEqual(['installation-electrique']));
 it('filters by location',()=>expect(filterListings('services','','','Gitega').map(l=>l.id)).toEqual(['nettoyage']));
 it('respects maximum price',()=>expect(filterListings('services','','','',20000).map(l=>l.id)).toEqual(['plomberie','nettoyage']));
 it('excludes unavailable offers',()=>expect(filterListings('services','','','',Infinity,true).some(l=>l.id==='nettoyage')).toBe(false));
 it('does not pretend a disconnected API works',async()=>{await expect(apiRequest('/me')).rejects.toBeInstanceOf(ApiError);});
});
