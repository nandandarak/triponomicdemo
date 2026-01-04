import { motion } from "framer-motion";
import PostcardCard from "./PostcardCard";

const DestinationRow = ({ title, subtitle, destinations, gatewayText, onGatewayClick, onDestinationClick, onEnquire }: any) => {
  return (
    <section className="py-24 px-6 bg-[#FDFCF9] relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-16">
          <p className="text-xs uppercase tracking-[0.4em] text-[#638C7D] font-bold mb-3">{subtitle}</p>
          <h2 className="font-script text-5xl md:text-6xl text-[#344E41] italic">{title}</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {destinations.map((dest: any) => (
            <div key={dest.name} className="relative w-full">
              <PostcardCard
                name={dest.name}
                image={dest.image}
                onClick={() => onDestinationClick(dest.name)}
                onEnquire={() => onEnquire(dest.name)}
              />
            </div>
          ))}
          
          <div className="relative w-full">
            <PostcardCard
              name="Gateway"
              isGateway
              gatewayText={gatewayText}
              onClick={onGatewayClick}
              onEnquire={() => {}}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DestinationRow;
