"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { FormControl, ListGroup, ListGroupItem } from "react-bootstrap";
import ModulesControls from "./ModulesControls";
import { BsGripVertical } from "react-icons/bs";
import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModuleControlButtons";
import * as client from "../../client";
import {
  addModule,
  editModule,
  updateModule,
  deleteModule,
  setModules,
} from "./reducer";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";

export default function Modules() {
  const [moduleName, setModuleName] = useState("");
  const { modules } = useSelector((state: RootState) => state.modulesReducer);
  const dispatch = useDispatch();

  const params = useParams();
  const cid = Array.isArray(params.cid) ? params.cid[0] : params.cid;

  const fetchModules = async () => {
    if (!cid) return;
    const modules = await client.findModulesForCourse(cid as string);
    dispatch(setModules(modules));
  };

  useEffect(() => {
    fetchModules();
  }, [cid]);

  const onCreateModuleForCourse = async () => {
    if (!cid) return;
    const newModule = { name: moduleName, course: cid };
    const module = await client.createModuleForCourse(cid as string, newModule);
    dispatch(addModule(module));
    setModuleName("");
  };

  const onRemoveModule = async (moduleId: string) => {
    if (cid) await client.deleteModule(cid, moduleId);
    dispatch(setModules(modules.filter((m: any) => m._id !== moduleId)));
  };

  const onUpdateModule = async (module: any) => {
    if (cid) await client.updateModule(cid, module);
    const newModules = modules.map((m: any) =>
      m._id === module._id ? module : m,
    );
    dispatch(setModules(newModules));
  };

  return (
    <div className="wd-modules-page d-flex flex-column w-100">
      {/* Row 1: controls bar */}
      <ModulesControls
        setModuleName={setModuleName}
        moduleName={moduleName}
        addModule={onCreateModuleForCourse}
      />

      {/* Row 2: modules list */}
      <div className="mt-4 w-100">
        <ListGroup className="rounded-0" id="wd-modules">
          {modules?.map((module: any) => (
            <ListGroupItem
              key={module._id}
              className="wd-module p-0 mb-5 fs-5 border-gray"
            >
              <div className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center flex-grow-1">
                  <BsGripVertical className="me-2 fs-3 flex-shrink-0" />
                  {!module.editing && <span>{module.name}</span>}
                  {module.editing && (
                    <FormControl
                      className="flex-grow-1"
                      onChange={(e) =>
                        dispatch(
                          updateModule({ ...module, name: e.target.value }),
                        )
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          onUpdateModule({ ...module, editing: false });
                        }
                      }}
                      defaultValue={module.name}
                    />
                  )}
                </div>
                <div className="flex-shrink-0">
                  <ModuleControlButtons
                    moduleId={module._id}
                    deleteModule={(moduleId) => onRemoveModule(moduleId)}
                    editModule={(moduleId) => dispatch(editModule(moduleId))}
                  />
                </div>
              </div>

              {module.lessons && (
                <ListGroup className="wd-lessons rounded-0">
                  {module.lessons.map((lesson: any) => (
                    <ListGroupItem
                      className="wd-lesson p-3 ps-1 d-flex align-items-center justify-content-between"
                      key={lesson._id}
                    >
                      <div className="d-flex align-items-center">
                        <BsGripVertical className="me-2 fs-3 flex-shrink-0" />
                        <span>{lesson.name}</span>
                      </div>
                      <div className="flex-shrink-0">
                        <LessonControlButtons />
                      </div>
                    </ListGroupItem>
                  ))}
                </ListGroup>
              )}
            </ListGroupItem>
          ))}
        </ListGroup>
      </div>
    </div>
  );
}
