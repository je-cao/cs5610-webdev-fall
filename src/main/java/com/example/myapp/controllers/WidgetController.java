package com.example.myapp.controllers;
import com.example.myapp.models.Widget;
import com.example.myapp.services.WidgetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.awt.event.WindowEvent;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class WidgetController {

    @Autowired
    WidgetService service;// = new WidgetService();

    @GetMapping("/hello")
    public String sayHello() {
        return "Hello World!!";
    }

    @GetMapping("/api/topics/{topicId}/widgets")
    public List<Widget> findWidgetsForTopic(
            @PathVariable("topicId") String topicId) {
        return service.findWidgetsForTopic(topicId);
    }

    @GetMapping("/api/widgets")
    public List<Widget> findAllWidgets() {
        return service.findAllWidgets();
    }
    @GetMapping("/api/widgets/{wid}")
    public Widget findWidgetById(
            @PathVariable("wid") Integer widgetId) {
        return service.findWidgetById(widgetId);
    }
    @PostMapping("/api/topics/{topicId}/widgets")
    public Widget createWidget(
            @PathVariable("topicId") String tid,
            @RequestBody Widget widget) {
        widget.setTopicId(tid);
        return service.createWidget(widget);
    }
    @DeleteMapping("/api/widgets/{widgetId}")
    public void deleteWidget(
            @PathVariable("widgetId") Integer wid) {
        service.deleteWidget(wid);
    }
    @PutMapping("/api/widgets/{wid}")
    public Widget updateWidget(
            @PathVariable("wid") Integer widgetId,
            @RequestBody Widget newWidget) {
        return service.updateWidget(widgetId, newWidget);
    }
    public Widget deleteWidgetById(Integer widgetId){
        for (Widget w : widgets){
            if(w.getId().equals(widgetId))
                widgets.remove(w);
        }
        return null;
    }
}
