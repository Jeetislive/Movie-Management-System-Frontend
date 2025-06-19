import React, { useState } from "react";
import { Modal } from "antd";
import MovieDetails from "./MovieDetails";
import { ActorDetails } from "./ActorDetails";

interface SideModalProps {
  isVisible: boolean;
  onClose: () => void;
  filmId: number;
}

const SideModal: React.FC<SideModalProps> = ({
  isVisible,
  onClose,
  filmId,
}) => {
  const [activeTab, setActiveTab] = useState("movie");

  const tabs = [
    { id: "movie", label: "Movie Details" },
    { id: "actor", label: "Actor Details" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "movie":
        return (
          <MovieDetails
            filmId={String(filmId)}
            isOpen={isVisible}
            onClose={onClose}
          />
        );
      case "actor":
        return (
          <ActorDetails
            filmId={String(filmId)}
            isOpen={isVisible}
            onClose={onClose}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Modal
      open={isVisible}
      onCancel={onClose}
      footer={null}
      width={600}
      maskClosable={true}
      destroyOnHidden={false}
      className="fixed right-0 top-0 transition-transform duration-300 ease-in-out"
      rootClassName="!absolute !right-0 !top-0"
      style={{ position: "absolute", right: 0, top: 54 }}
    >
      <div className="h-[calc(100vh-110px)] overflow-y-auto">
        <div className="flex space-x-4 mb-4 border-b">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`py-2 px-4 ${
                activeTab === tab.id
                  ? "border-b-2 border-blue-500 text-blue-500"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="mt-4">
          {renderContent()}
        </div>
      </div>
    </Modal>
  );
};

export default SideModal;