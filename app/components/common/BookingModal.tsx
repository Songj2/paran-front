import { useRouter } from "next/navigation";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import Alert from "./Alert";
import { useAppDispatch } from "@/lib/store";
import { saveBookings } from "@/lib/features/room/bookings.slice";
import { BookingModel } from "@/app/model/room/bookings.model";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  id: number;
}

export default function BookingModal({ id, isOpen, onClose }: BookingModalProps) {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [alertMessage, setAlertMessage] = useState("");
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [formData, setFormData] = useState<BookingModel>({
    enabled: false,
    date: '',
    usingTime: [],
    roomId: id,
    groupId: 0
  });
  const [isDateSelected, setIsDateSelected] = useState(false);
  const [minDate, setMinDate] = useState("");

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    setMinDate(`${year}-${month}-${day}`);
  }, []);

  if (!isOpen) return null;

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData(prevState => ({
      ...prevState,
      date: e.target.value
    }));
    setIsDateSelected(true);
  };

  const handleTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      usingTime: checked
        ? [...prevState.usingTime, value]
        : prevState.usingTime.filter(item => item !== value)
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(formData);
    dispatch(saveBookings([formData]));
    setAlertMessage("예약 되었습니다.");
    setIsAlertOpen(true);
  };

  const handleAlertClose = () => {
    setIsAlertOpen(false);
    setIsConfirmOpen(true);
  };

  const handleConfirm = () => {
    setIsConfirmOpen(false);
    router.push('/booking');
  };

  const handleCancel = () => {
    setIsConfirmOpen(false);
  };

  const timeSlots = ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00'];

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="relative p-4 w-full max-w-lg max-h-full">
          <div className="relative bg-white rounded-lg shadow">
            <ModalHeader onClose={onClose} />
            <ModalBody 
              formData={formData}
              handleDateChange={handleDateChange}
              handleTimeChange={handleTimeChange}
              handleSubmit={handleSubmit}
              timeSlots={timeSlots}
              isDateSelected={isDateSelected}
              minDate={minDate}
            />
          </div>
        </div>
      </div>
      <Alert
        message={alertMessage}
        isOpen={isAlertOpen}
        onClose={handleAlertClose}
      />
      <Alert
        message="예약신청내역으로 이동하시겠습니까?"
        isOpen={isConfirmOpen}
        onClose={handleCancel}
        onConfirm={handleConfirm}
        showConfirm={true}
      />
    </>
  );
}

const ModalHeader = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
      <h3 className="text-xl font-semibold text-gray-900">
        예약하기
      </h3>
      <button 
        type="button" 
        onClick={onClose} 
        className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
      >
        <svg className="size-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
        </svg>
        <span className="sr-only">닫기</span>
      </button>
    </div>
  );
}

function ModalBody({ 
  formData, 
  handleDateChange, 
  handleTimeChange, 
  handleSubmit, 
  timeSlots,
  isDateSelected,
  minDate
}: {
  formData: BookingModel;
  handleDateChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleTimeChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: FormEvent) => void;
  timeSlots: string[];
  isDateSelected: boolean;
  minDate: string;
}) {
  return (
    <div className="p-4 md:p-5">
      <form className="space-y-4" action="#" onSubmit={handleSubmit}>
        <input 
          type="date" 
          value={formData.date}
          onChange={handleDateChange}
          min={minDate}
          className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full px-2.5" 
        />
        {formData.date && <span className="text-green-600">예약가능 날짜 입니다.</span>}
        {isDateSelected && (
          <TimeSlots 
            timeSlots={timeSlots} 
            handleChange={handleTimeChange}
            selectedTimes={formData.usingTime}
          />
        )}
        <button 
          type="submit" 
          className="w-full text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          disabled={!isDateSelected || formData.usingTime.length === 0}
        >
          예약 신청하기
        </button>
        <div className="text-sm font-medium text-green-700 hover:underline">
          요청이 수락되면 알려드릴게요!^^
        </div>
      </form>
    </div>
  );
}

function TimeSlots({ timeSlots, handleChange, selectedTimes }: {
  timeSlots: string[];
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  selectedTimes: string[];
}) {
  return (
    <ul className="grid grid-cols-6 gap-2">
      {timeSlots.map((time) => (
        <li key={time}>
          <input 
            type="checkbox" 
            id={`time${time}`} 
            name="time" 
            value={time} 
            onChange={handleChange} 
            checked={selectedTimes.includes(time)}
            className="hidden peer" 
          />
          <label 
            htmlFor={`time${time}`} 
            className="p-2 text-center text-green-500 bg-white border-2 border-green-200 rounded-lg cursor-pointer peer-checked:border-green-600 hover:text-green-600  peer-checked:text-green-600 hover:bg-green-500"
          >
            {time}
          </label>
        </li>
      ))}
    </ul>
  );
}